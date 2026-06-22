#!/usr/bin/env python3
#
# Copyright 2026 Harald Pretl, Department for Integrated Circuits (ICD)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""
Generates an EDITABLE SVG map of Austria with all microelectronics
locations from data.js.

  python3 generate_svg.py

Result: microelectronics_austria.svg  (editable in Inkscape / Illustrator / Keynote;
state areas, points and labels can be selected individually.)

Requires only the standard library. Downloads the state geometry once
from the web and stores it locally as austria_states.geojson (cache).
"""
import json
import os
import re
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
GEOJSON_CACHE = os.path.join(HERE, "austria_states.geojson")
DATA_JS = os.path.join(HERE, "data.js")
OUT_SVG = os.path.join(HERE, "microelectronics_austria.svg")

GEOJSON_URLS = [
    "https://raw.githubusercontent.com/ginseng666/GeoJSON-TopoJSON-Austria/master/2021/simplified-99.5/laender_995_geo.json",
    "https://raw.githubusercontent.com/ginseng666/GeoJSON-TopoJSON-Austria/master/2021/simplified-99-5/laender_995_geo.json",
    "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/austria-states.geojson",
]

W, H = 1720, 1188          # SVG size (A4 landscape ratio 297:210)
MAP = (30, 95, 1180, 1130)  # map area (x0, y0, x1, y1)
PANEL_X = 1210             # left edge of the legend list
PANEL_COLS = 1            # columns of the location list
PANEL_COL_W = 500         # column width
DOT_R = 6                  # point radius


def load_geojson():
    if os.path.exists(GEOJSON_CACHE):
        with open(GEOJSON_CACHE, encoding="utf-8") as fh:
            return json.load(fh)
    last_err = None
    for url in GEOJSON_URLS:
        try:
            print(f"Downloading state geometry: {url}")
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            with open(GEOJSON_CACHE, "w", encoding="utf-8") as fh:
                json.dump(data, fh)
            return data
        except Exception as e:  # noqa: BLE001
            print(f"  -> failed: {e}")
            last_err = e
    raise SystemExit(f"Could not load geometry. Last error: {last_err}")


def load_companies():
    """Tolerant parsing of the window.COMPANIES array from data.js."""
    with open(DATA_JS, encoding="utf-8") as fh:
        txt = fh.read()

    def extract_array(varname):
        start = txt.index(varname)
        start = txt.index("[", start)
        depth = 0
        for i in range(start, len(txt)):
            if txt[i] == "[":
                depth += 1
            elif txt[i] == "]":
                depth -= 1
                if depth == 0:
                    return txt[start:i + 1]
        raise ValueError("Array end not found: " + varname)

    def to_json(arr):
        # remove // comments (but not :// in URLs)
        arr = re.sub(r"(?<!:)//[^\n]*", "", arr)
        # unquoted keys -> "key":
        arr = re.sub(r"([{\s,])([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', arr)
        # remove trailing commas
        arr = re.sub(r",(\s*[}\]])", r"\1", arr)
        return json.loads(arr)

    companies = to_json(extract_array("window.COMPANIES"))
    categories = to_json("[" + extract_array_obj(txt, "window.CATEGORIES") + "]")[0]
    return companies, categories


def extract_array_obj(txt, varname):
    start = txt.index(varname)
    start = txt.index("{", start)
    depth = 0
    for i in range(start, len(txt)):
        if txt[i] == "{":
            depth += 1
        elif txt[i] == "}":
            depth -= 1
            if depth == 0:
                body = txt[start:i + 1]
                body = re.sub(r"(?<!:)//[^\n]*", "", body)
                body = re.sub(r"([{\s,])([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', body)
                body = re.sub(r",(\s*[}\]])", r"\1", body)
                return body
    raise ValueError("Object end not found: " + varname)


def iter_rings(geom):
    t = geom["type"]
    coords = geom["coordinates"]
    if t == "Polygon":
        for ring in coords:
            yield ring
    elif t == "MultiPolygon":
        for poly in coords:
            for ring in poly:
                yield ring


def bbox_of(geojson):
    minx = miny = float("inf")
    maxx = maxy = float("-inf")
    for feat in geojson["features"]:
        for ring in iter_rings(feat["geometry"]):
            for x, y in ring:
                minx, maxx = min(minx, x), max(maxx, x)
                miny, maxy = min(miny, y), max(maxy, y)
    return minx, miny, maxx, maxy


def make_projector(bbox, box):
    minx, miny, maxx, maxy = bbox
    x0, y0, x1, y1 = box
    # simple equirectangular projection with latitude correction
    import math
    lat0 = math.radians((miny + maxy) / 2)
    sx = math.cos(lat0)
    gw = (maxx - minx) * sx
    gh = (maxy - miny)
    scale = min((x1 - x0) / gw, (y1 - y0) / gh)
    ox = x0 + ((x1 - x0) - gw * scale) / 2
    oy = y0 + ((y1 - y0) - gh * scale) / 2

    def proj(lon, lat):
        x = ox + (lon - minx) * sx * scale
        y = oy + (maxy - lat) * scale
        return x, y

    return proj


def esc(s):
    return (str(s).replace("&", "&amp;").replace("<", "&lt;")
            .replace(">", "&gt;").replace('"', "&quot;"))
def relax_markers(positions, radius=13, iterations=120):
    """Pushes markers that are too close apart so numbers stay readable."""
    import math
    pos = [list(p) for p in positions]
    min_d = radius * 2
    for _ in range(iterations):
        moved = False
        for i in range(len(pos)):
            for j in range(i + 1, len(pos)):
                dx = pos[j][0] - pos[i][0]
                dy = pos[j][1] - pos[i][1]
                d = math.hypot(dx, dy)
                if d < min_d:
                    if d < 1e-6:
                        dx, dy, d = 0.6, 0.8, 1.0
                    push = (min_d - d) / 2
                    ux, uy = dx / d, dy / d
                    pos[i][0] -= ux * push
                    pos[i][1] -= uy * push
                    pos[j][0] += ux * push
                    pos[j][1] += uy * push
                    moved = True
        if not moved:
            break
    return pos


def main():
    geo = load_geojson()
    companies, categories = load_companies()
    proj = make_projector(bbox_of(geo), MAP)

    # group by city, ordered from west to east
    cities = {}
    for f in companies:
        cities.setdefault(f["city"], []).append(f)
    order = sorted(cities, key=lambda o: cities[o][0]["lon"])
    number = {city: i + 1 for i, city in enumerate(order)}

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
        f'viewBox="0 0 {W} {H}" font-family="Arial, Helvetica, sans-serif">',
        f'<rect width="{W}" height="{H}" fill="#eef3f8"/>',
        '<g id="bundeslaender" stroke="#9bb0c4" stroke-width="1" fill="#dfe8f1">',
    ]

    # state areas
    for feat in geo["features"]:
        name = (feat.get("properties", {}).get("name")
                or feat.get("properties", {}).get("NAME")
                or feat.get("properties", {}).get("BL") or "")
        d = []
        for ring in iter_rings(feat["geometry"]):
            pts = " ".join(f"{proj(x, y)[0]:.1f},{proj(x, y)[1]:.1f}" for x, y in ring)
            d.append("M" + pts + "Z")
        parts.append(f'<path id="{esc(name)}" d="{" ".join(d)}"><title>{esc(name)}</title></path>')
    parts.append("</g>")

    # title
    parts.append(
        f'<text x="40" y="50" font-size="32" font-weight="bold" fill="#1d3b57">'
        f'Microelectronics in Austria</text>')
    parts.append(
        f'<text x="40" y="76" font-size="16" fill="#456">'
        f'Companies, research &amp; institutions · {len(companies)} location entries in '
        f'{len(cities)} cities</text>')
    parts.append(
        f'<text x="40" y="96" font-size="13" fill="#789">'
        f'&#169; 2026 Harald Pretl, Johannes Kepler University, Linz, Austria</text>')

    # real geo positions + relaxed positions for the numbered markers
    geo_xy = []
    for city in order:
        group = cities[city]
        lon = sum(f["lon"] for f in group) / len(group)
        lat = sum(f["lat"] for f in group) / len(group)
        geo_xy.append(proj(lon, lat))
    marker_xy = relax_markers(geo_xy, radius=13)

    # city markers (numbered) on the map; leader line to the real position
    parts.append('<g id="locations">')
    for idx, city in enumerate(order):
        group = cities[city]
        gx, gy = geo_xy[idx]
        mx, my = marker_xy[idx]
        n = number[city]
        cats = [f["category"] for f in group]
        main_cat = max(set(cats), key=cats.count)
        color = categories.get(main_cat, {"color": "#555"})["color"]
        r = 9 if len(group) == 1 else 11
        title = esc(city) + ": " + ", ".join(esc(f["name"]) for f in group)
        leader = ""
        if (mx - gx) ** 2 + (my - gy) ** 2 > 9:
            leader = (f'<line x1="{gx:.1f}" y1="{gy:.1f}" x2="{mx:.1f}" y2="{my:.1f}" '
                      f'stroke="#5b6b7d" stroke-width="0.8"/>'
                      f'<circle cx="{gx:.1f}" cy="{gy:.1f}" r="1.6" fill="#5b6b7d"/>')
        parts.append(
            f'<g class="city"><title>{title}</title>{leader}'
            f'<circle cx="{mx:.1f}" cy="{my:.1f}" r="{r}" fill="{color}" '
            f'stroke="#fff" stroke-width="2"/>'
            f'<text x="{mx:.1f}" y="{my + 3.5:.1f}" font-size="11" font-weight="bold" '
            f'fill="#fff" text-anchor="middle">{n}</text></g>')
    parts.append("</g>")

    # category legend (bottom left on the map) – three columns
    cat_items = list(categories.items())
    n_rows = (len(cat_items) + 2) // 3
    leg_col_w = 340
    leg_h = 22 * n_rows + 36
    parts.append(f'<g id="category-legend" transform="translate(40,{H - leg_h - 40})">')
    parts.append(f'<rect x="-12" y="-20" width="{leg_col_w * 3 + 24}" height="{leg_h}" rx="8" '
                 f'fill="#ffffff" fill-opacity="0.9" stroke="#9bb0c4"/>')
    parts.append('<text x="0" y="0" font-size="14" font-weight="bold" fill="#1d3b57">Categories</text>')
    for i, (key, k) in enumerate(cat_items):
        col = i // n_rows
        r = i % n_rows
        cx = col * leg_col_w
        row = 20 + r * 22
        parts.append(
            f'<circle cx="{cx + 7}" cy="{row - 4}" r="6" fill="{k["color"]}" stroke="#333"/>'
            f'<text x="{cx + 22}" y="{row}" font-size="12" fill="#222">{esc(k["label"])}</text>')
    parts.append("</g>")

    # legend list on the right: cities (numbered) with companies – multi-column, without splitting a city
    parts.append(f'<g id="list">')
    parts.append(f'<text x="{PANEL_X}" y="76" font-size="17" font-weight="bold" '
                 f'fill="#1d3b57">Locations (West → East)</text>')
    top, bottom = 100, H - 30
    col = 0
    yy = top

    def block_height(group):
        return 18 + 15 * len(group) + 6

    for city in order:
        group = cities[city]
        bh = block_height(group)
        if yy + bh > bottom and col < PANEL_COLS - 1:
            col += 1
            yy = top
        cx = PANEL_X + col * PANEL_COL_W
        n = number[city]
        st = group[0]["state"]
        parts.append(
            f'<circle cx="{cx + 8}" cy="{yy - 4}" r="9" fill="#1d3b57"/>'
            f'<text x="{cx + 8}" y="{yy - 0.5}" font-size="10" font-weight="bold" fill="#fff" '
            f'text-anchor="middle">{n}</text>'
            f'<text x="{cx + 24}" y="{yy}" font-size="12.5" font-weight="bold" fill="#1d3b57">'
            f'{esc(city)} <tspan font-weight="normal" fill="#789">({esc(st)})</tspan></text>')
        yy += 18
        for f in group:
            color = categories.get(f["category"], {"color": "#888"})["color"]
            nm = f["name"]
            parts.append(
                f'<circle cx="{cx + 30}" cy="{yy - 3.5}" r="4" fill="{color}" stroke="#fff"/>'
                f'<text x="{cx + 40}" y="{yy}" font-size="10.5" fill="#222">{esc(nm)}</text>')
            yy += 15
        yy += 6
    parts.append("</g>")

    parts.append(
        f'<text x="40" y="{H - 14}" font-size="10" fill="#789">'
        f'Source: curated from FEEI, Silicon Alps Cluster, Silicon Austria Labs, '
        f'company register/Northdata &amp; company/university websites · Geometry: GeoJSON '
        f'Austria · As of 2026-06 · Markers slightly relaxed in metropolitan areas</text>')

    parts.append("</svg>")

    with open(OUT_SVG, "w", encoding="utf-8") as fh:
        fh.write("\n".join(parts))
    print(f"Done: {OUT_SVG}  ({len(companies)} companies in {len(cities)} cities)")


if __name__ == "__main__":
    sys.exit(main())
