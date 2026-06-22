/*
 * Copyright 2026 Harald Pretl, Department for Integrated Circuits (ICD)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Editable data source: Microelectronics in Austria (COMPLETE)
 * -----------------------------------------------------------
 * Source: curated & researched from publicly available information
 *   (FEEI, Silicon Alps Cluster, Silicon Austria Labs, company/university websites,
 *    company register/Northdata, Wikipedia, trade press) + own slide "Silicon Valley
 *    Austria". As of 2026-06.
 *
 * EDITING:
 *   - Each entry = one location. Add/change/remove lines.
 *   - "lat"/"lon": coordinates in decimal degrees.
 *   - "category": must match a key in CATEGORIES (see below).
 *   - "note": optional remark (appears in the tooltip/popup).
 *   - After saving: reload map.html or run generate_svg.py again.
 */

window.CATEGORIES = {
  semiconductor: { label: "Semiconductor manufacturer / Fab",          color: "#e6194B" },
  design:        { label: "Chip design / Fabless / Design center",     color: "#f58231" },
  components:    { label: "Components, substrates, packaging & EMS",    color: "#ffd700" },
  equipment:     { label: "Equipment & masks",                         color: "#808000" },
  material:      { label: "Materials",                                 color: "#9A6324" },
  sensors:       { label: "Sensors & measurement technology (incl. MEMS)", color: "#42d4f4" },
  embedded:      { label: "Embedded, Power & Automation",              color: "#3cb44b" },
  research:      { label: "Research institution",                      color: "#4363d8" },
  university:    { label: "University / UAS",                          color: "#911eb4" },
  cluster:       { label: "Cluster & association",                     color: "#000000" }
};

window.COMPANIES = [
  // ===================== SEMICONDUCTOR MANUFACTURERS / FAB =====================
  { name: "Infineon Technologies Austria (HQ + power semiconductor fab)", city: "Villach", state: "Carinthia", lat: 46.6111, lon: 13.8558, category: "semiconductor", web: "https://www.infineon.com/austria" },
  { name: "ams OSRAM (sensor fab)", city: "Premstätten", state: "Styria", lat: 46.9869, lon: 15.4060, category: "semiconductor", web: "https://ams-osram.com" },
  { name: "Vishay Semiconductor Austria", city: "Vöcklabruck", state: "Upper Austria", lat: 48.0050, lon: 13.6550, category: "semiconductor", web: "https://www.vishay.com" },

  // ===================== CHIP DESIGN / FABLESS / DESIGN CENTERS =====================
  { name: "Infineon Technologies Austria (design center)", city: "Graz", state: "Styria", lat: 47.0707, lon: 15.4395, category: "design", web: "https://www.infineon.com/austria" },
  { name: "Infineon Technologies Austria (design center)", city: "Klagenfurt", state: "Carinthia", lat: 46.6230, lon: 14.3050, category: "design", web: "https://www.infineon.com/austria" },
  { name: "Infineon Technologies (design center)", city: "Linz", state: "Upper Austria", lat: 48.3069, lon: 14.2858, category: "design", web: "https://www.infineon.com/austria" },
  { name: "NXP Semiconductors Austria (security/RFID IC design)", city: "Gratkorn", state: "Styria", lat: 47.1233, lon: 15.3469, category: "design", web: "https://www.nxp.com" },
  { name: "Apple (design center)", city: "Linz", state: "Upper Austria", lat: 48.3010, lon: 14.3050, category: "design", web: "https://www.apple.com", note: "Apple research subsidiary, 2019 from Intel's modem division" },
  { name: "Bridgecom Semiconductors (fabless, cellular IoT modems)", city: "Linz", state: "Upper Austria", lat: 48.3120, lon: 14.3030, category: "design", web: "https://www.bridgecom-semiconductors.com" },
  { name: "Intel Austria (analog/mixed-signal IP for 5G)", city: "Villach", state: "Carinthia", lat: 46.6300, lon: 13.8800, category: "design", web: "https://www.intel.com" },
  { name: "Qualcomm Austria RFFE (RF front-end development)", city: "Deutschlandsberg", state: "Styria", lat: 46.8150, lon: 15.2200, category: "design", web: "https://www.qualcomm.com" },
  { name: "Qualcomm Research Austria", city: "Salzburg", state: "Salzburg", lat: 47.8095, lon: 13.0550, category: "design", web: "https://www.qualcomm.com/research/locations/austria" },
  { name: "Renesas Electronics (formerly Panthronics, NFC chips)", city: "Graz", state: "Styria", lat: 47.0470, lon: 15.4250, category: "design", web: "https://www.renesas.com" },
  { name: "STMicroelectronics Austria (NFC/UWB Competence Center)", city: "Graz", state: "Styria", lat: 47.0455, lon: 15.4240, category: "design", web: "https://www.st.com" },
  { name: "CISC Semiconductor (RFID/NFC/RISC-V engineering)", city: "Klagenfurt", state: "Carinthia", lat: 46.6160, lon: 14.2650, category: "design", web: "https://www.cisc.at" },
  { name: "Bosch (Robert Bosch AG, automotive electronics development)", city: "Linz", state: "Upper Austria", lat: 48.2800, lon: 14.3200, category: "design", web: "https://www.bosch.at", note: "Electronics/software development; no chip manufacturing in AT" },
  { name: "Broadcom", city: "Vienna", state: "Vienna", lat: 48.1820, lon: 16.3330, category: "design", web: "https://www.broadcom.com", note: "per slide; in AT only software/sales presence documented so far" },
  { name: "Medtronic", city: "Innsbruck", state: "Tyrol", lat: 47.2692, lon: 11.4041, category: "design", web: "https://www.medtronic.com", note: "per slide; in AT mainly sales – microelectronics site unconfirmed" },

  // ===================== COMPONENTS, SUBSTRATES, PACKAGING & EMS =====================
  { name: "AT&S Austria Technologie & Systemtechnik (IC substrates, HDI PCB)", city: "Leoben", state: "Styria", lat: 47.3830, lon: 15.0960, category: "components", web: "https://ats.net" },
  { name: "TDK Electronics (formerly EPCOS, passives/piezo)", city: "Deutschlandsberg", state: "Styria", lat: 46.8150, lon: 15.2200, category: "components", web: "https://www.tdk-electronics.tdk.com" },

  // ===================== EQUIPMENT & MASKS =====================
  { name: "EV Group (EVG, wafer bonding & lithography)", city: "St. Florian am Inn", state: "Upper Austria", lat: 48.3700, lon: 13.4800, category: "equipment", web: "https://www.evgroup.com" },
  { name: "IMS Nanofabrication (Intel, multibeam mask writer)", city: "Brunn am Gebirge", state: "Lower Austria", lat: 48.1060, lon: 16.2900, category: "equipment", web: "https://www.imsnanofabrication.com" },
  { name: "Lam Research Austria (formerly SEZ, wet process)", city: "Villach", state: "Carinthia", lat: 46.6100, lon: 13.8700, category: "equipment", web: "https://www.lamresearch.com" },
  { name: "Semsysco (Lam Research, wet chemistry)", city: "Salzburg", state: "Salzburg", lat: 47.8095, lon: 13.0560, category: "equipment", web: "https://www.lamresearch.com" },
  { name: "BESI Austria (formerly Datacon, die attach/packaging)", city: "Radfeld", state: "Tyrol", lat: 47.4300, lon: 11.9100, category: "equipment", web: "https://www.besi.com" },

  // ===================== MATERIALS =====================
  { name: "Plansee SE (refractory metals, sputter targets, EUV components)", city: "Reutte", state: "Tyrol", lat: 47.4900, lon: 10.7180, category: "material", web: "https://www.plansee.com" },
  { name: "RHP-Technology (sputter targets, PV material recycling)", city: "Seibersdorf", state: "Lower Austria", lat: 47.9700, lon: 16.5000, category: "material", web: "https://www.rhp-technology.com" },

  // ===================== SENSORS & MEASUREMENT TECHNOLOGY (incl. MEMS) =====================
  { name: "USound (MEMS speakers)", city: "Graz", state: "Styria", lat: 47.0460, lon: 15.4260, category: "sensors", web: "https://usound.com" },
  { name: "SteadySense (medical sensor patches)", city: "Graz", state: "Styria", lat: 47.0500, lon: 15.4400, category: "sensors", web: "https://steadysense.at" },

  // ===================== RESEARCH INSTITUTIONS =====================
  { name: "Silicon Austria Labs (SAL) – HQ", city: "Graz", state: "Styria", lat: 47.0577, lon: 15.4595, category: "research", web: "https://silicon-austria-labs.com" },
  { name: "Silicon Austria Labs (SAL)", city: "Villach", state: "Carinthia", lat: 46.6140, lon: 13.8480, category: "research", web: "https://silicon-austria-labs.com" },
  { name: "Silicon Austria Labs (SAL)", city: "Linz", state: "Upper Austria", lat: 48.3350, lon: 14.3200, category: "research", web: "https://silicon-austria-labs.com" },

  // ===================== UNIVERSITIES / UAS =====================
  { name: "TU Wien – Institute of Microelectronics / ZMNS / ISAS", city: "Vienna", state: "Vienna", lat: 48.1965, lon: 16.3700, category: "university", web: "https://www.tuwien.at/etit" },
  { name: "TU Graz – Institute of Electronics (IFE)", city: "Graz", state: "Styria", lat: 47.0585, lon: 15.4600, category: "university", web: "https://www.tugraz.at/institute/ife/home" },
  { name: "JKU Linz – Institute for Microelectronics and Microsensors", city: "Linz", state: "Upper Austria", lat: 48.3370, lon: 14.3190, category: "university", web: "https://www.jku.at" },
  { name: "JKU Linz – Department of Integrated Circuits", city: "Linz", state: "Upper Austria", lat: 48.3370, lon: 14.3190, category: "university", web: "https://www.jku.at" },
  { name: "Carinthia UAS / CIME (IC design, green electronics)", city: "Villach", state: "Carinthia", lat: 46.6100, lon: 13.8400, category: "university", web: "https://www.fh-kaernten.at" },

  // ===================== CLUSTERS & ASSOCIATIONS =====================
  { name: "SILICON ALPS Cluster", city: "Villach", state: "Carinthia", lat: 46.6090, lon: 13.8490, category: "cluster", web: "https://www.silicon-alps.at" },
  { name: "FEEI – Association of the Electrical and Electronics Industry", city: "Vienna", state: "Vienna", lat: 48.1950, lon: 16.3760, category: "cluster", web: "https://www.feei.at" }
];
