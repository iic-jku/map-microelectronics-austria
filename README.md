# Microelectronics in Austria — Map

An interactive map and an editable SVG that visualize companies, research
institutions, universities, and clusters of the Austrian microelectronics
ecosystem ("Silicon Austria").

**Live map:** https://iic-jku.github.io/map-microelectronics-austria/

The dataset is curated from publicly available information (FEEI, Silicon Alps
Cluster, Silicon Austria Labs, company/university websites, the company
register/Northdata, Wikipedia, and trade press).

## Contents

| File | Description |
| --- | --- |
| [`map.html`](map.html) | Interactive [Leaflet](https://leafletjs.com/) map (published via GitHub Pages as `index.html`). |
| [`data.js`](data.js) | The editable data source: categories and locations. |
| [`generate_svg.py`](generate_svg.py) | Generates an editable, print-ready SVG map from `data.js`. |
| [`austria_states.geojson`](austria_states.geojson) | Cached Austrian state boundary geometry (used by the SVG generator). |

## Editing the data

All locations live in [`data.js`](data.js). Each entry is one location:

```js
{ name: "Company / Institution", city: "Villach", state: "Carinthia",
  lat: 46.6111, lon: 13.8558, category: "semiconductor",
  web: "https://example.com", note: "optional remark" }
```

- `lat` / `lon`: coordinates in decimal degrees.
- `category`: must match a key in the `CATEGORIES` object at the top of the file.
- `note`: optional; shown in the tooltip/popup.

After editing, reload `map.html` or re-run the SVG generator.

## Local usage

View the interactive map by opening `map.html` in a browser (it loads Leaflet
from a CDN and OpenStreetMap tiles).

Generate the SVG (requires only the Python standard library):

```sh
python3 generate_svg.py
# -> microelectronics_austria.svg
```

The state geometry is read from the committed `austria_states.geojson`, so the
generator runs fully offline.

## Continuous deployment

The [GitHub Actions workflow](.github/workflows/pages.yml) runs on every push to
`main`:

1. regenerates `microelectronics_austria.svg` from `data.js`, and
2. publishes the interactive map (and the generated SVG) to **GitHub Pages**.

To enable publishing, set **Settings → Pages → Build and deployment → Source**
to **GitHub Actions** once in the repository.

## License

Licensed under the [Apache License, Version 2.0](LICENSE). See [`NOTICE`](NOTICE)
for attribution details.

Copyright 2026 Harald Pretl, Department for Integrated Circuits (ICD),
Johannes Kepler University, Linz, Austria, in cooperation with FEEI.
