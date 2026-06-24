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
  { name: "Infineon Technologies Austria (HQ + power semiconductor fab)", city: "Villach", state: "Carinthia", lat: 46.5962, lon: 13.8555, category: "semiconductor", web: "https://www.infineon.com/austria" },
  { name: "ams OSRAM (sensor fab)", city: "Premstätten", state: "Styria", lat: 46.9869, lon: 15.4060, category: "semiconductor", web: "https://ams-osram.com" },
  { name: "Vishay Semiconductor Austria", city: "Vöcklabruck", state: "Upper Austria", lat: 48.0037, lon: 13.6583, category: "semiconductor", web: "https://www.vishay.com" },

  // ===================== CHIP DESIGN / FABLESS / DESIGN CENTERS =====================
  { name: "semify (digital ASIC design & verification)", city: "Graz", state: "Styria", lat: 47.0775, lon: 15.4312, category: "design", web: "https://www.semify-eda.com" },
  { name: "Photeon Technologies (silicon photonics chip design)", city: "Dornbirn", state: "Vorarlberg", lat: 47.4052, lon: 9.7417, category: "design", web: "https://www.photeon.com" },
  { name: "Infineon Technologies Austria (design center)", city: "Graz", state: "Styria", lat: 47.0826, lon: 15.4164, category: "design", web: "https://www.infineon.com/austria" },
  { name: "Infineon Technologies Austria (design center)", city: "Klagenfurt", state: "Carinthia", lat: 46.6148, lon: 14.2622, category: "design", web: "https://www.infineon.com/austria" },
  { name: "Infineon Technologies (design center)", city: "Linz", state: "Upper Austria", lat: 48.3150, lon: 14.3040, category: "design", web: "https://www.infineon.com/austria" },
  { name: "NXP Semiconductors Austria (security/RFID IC design)", city: "Gratkorn", state: "Styria", lat: 47.1233, lon: 15.3469, category: "design", web: "https://www.nxp.com" },
  { name: "Apple (design center)", city: "Linz", state: "Upper Austria", lat: 48.2847, lon: 14.2897, category: "design", web: "https://www.apple.com" },
  { name: "Bridgecom Semiconductors (fabless, cellular IoT modems)", city: "Linz", state: "Upper Austria", lat: 48.2962, lon: 14.2888, category: "design", web: "https://www.bridgecom-semiconductors.com" },
  { name: "Intel Austria (analog/mixed-signal IP for 5G)", city: "Villach", state: "Carinthia", lat: 46.6167, lon: 13.8433, category: "design", web: "https://www.intel.com" },
  { name: "Qualcomm Austria RFFE (RF front-end development)", city: "Deutschlandsberg", state: "Styria", lat: 46.8243, lon: 15.2313, category: "design", web: "https://www.qualcomm.com" },
  { name: "Qualcomm Research Austria", city: "Salzburg", state: "Salzburg", lat: 47.7987, lon: 13.0440, category: "design", web: "https://www.qualcomm.com/research/locations/austria" },
  { name: "Renesas Electronics (formerly Panthronics, NFC chips)", city: "Graz", state: "Styria", lat: 47.0365, lon: 15.4435, category: "design", web: "https://www.renesas.com" },
  { name: "STMicroelectronics Austria (NFC/UWB Competence Center)", city: "Graz", state: "Styria", lat: 47.0653, lon: 15.4336, category: "design", web: "https://www.st.com" },
  { name: "CISC Semiconductor (RFID/NFC/RISC-V engineering)", city: "Klagenfurt", state: "Carinthia", lat: 46.6203, lon: 14.2644, category: "design", web: "https://www.cisc.at" },
  { name: "Bosch (Robert Bosch AG, automotive electronics development)", city: "Linz", state: "Upper Austria", lat: 48.2740, lon: 14.3280, category: "design", web: "https://www.bosch.at" },
  { name: "Broadcom", city: "Vienna", state: "Vienna", lat: 48.1708, lon: 16.3337, category: "design", web: "https://www.broadcom.com" },
  { name: "Symbiotic EDA (formal verification EDA tools)", city: "Vienna", state: "Vienna", lat: 48.1817, lon: 16.3725, category: "design", web: "https://www.symbioticeda.com" },
  { name: "YosysHQ (open-source synthesis & formal tools)", city: "Vienna", state: "Vienna", lat: 48.2237, lon: 16.3197, category: "design", web: "https://www.yosyshq.com" },
  { name: "MED-EL (hearing implants, cochlear/middle ear implant development & manufacturing)", city: "Innsbruck", state: "Tyrol", lat: 47.2707, lon: 11.3758, category: "design", web: "https://www.medel.com" },

  // ===================== COMPONENTS, SUBSTRATES, PACKAGING & EMS =====================
  { name: "AT&S Austria Technologie & Systemtechnik (IC substrates, HDI PCB)", city: "Leoben", state: "Styria", lat: 47.3792, lon: 15.0907, category: "components", web: "https://ats.net" },
  { name: "TDK Electronics (formerly EPCOS, passives/piezo)", city: "Deutschlandsberg", state: "Styria", lat: 46.8243, lon: 15.2313, category: "components", web: "https://www.tdk-electronics.tdk.com" },

  // ===================== EQUIPMENT & MASKS =====================
  { name: "EV Group (EVG, wafer bonding & lithography)", city: "St. Florian am Inn", state: "Upper Austria", lat: 48.4306, lon: 13.4449, category: "equipment", web: "https://www.evgroup.com" },
  { name: "IMS Nanofabrication (Intel, multibeam mask writer)", city: "Brunn am Gebirge", state: "Lower Austria", lat: 48.1063, lon: 16.2843, category: "equipment", web: "https://www.ims.co.at" },
  { name: "Lam Research Austria (formerly SEZ, wet process)", city: "Villach", state: "Carinthia", lat: 46.6197, lon: 13.8333, category: "equipment", web: "https://www.lamresearch.com" },
  { name: "Semsysco (Lam Research, wet chemistry)", city: "Salzburg", state: "Salzburg", lat: 47.7983, lon: 13.0028, category: "equipment", web: "https://www.lamresearch.com" },
  { name: "BESI Austria (formerly Datacon, die attach/packaging)", city: "Radfeld", state: "Tyrol", lat: 47.4280, lon: 11.9080, category: "equipment", web: "https://www.besi.com" },
  { name: "F&S BONDTEC Semiconductor (wire bonders & bond testers)", city: "Braunau am Inn", state: "Upper Austria", lat: 48.2632, lon: 13.0406, category: "equipment", web: "https://www.fsbondtec.at" },

  // ===================== MATERIALS =====================
  { name: "Plansee SE (refractory metals, sputter targets, EUV components)", city: "Reutte", state: "Tyrol", lat: 47.4870, lon: 10.7260, category: "material", web: "https://www.plansee.com" },
  { name: "RHP-Technology (sputter targets, PV material recycling)", city: "Seibersdorf", state: "Lower Austria", lat: 47.9733, lon: 16.5033, category: "material", web: "https://www.rhp-technology.com" },

  // ===================== SENSORS & MEASUREMENT TECHNOLOGY (incl. MEMS) =====================
  { name: "USound (MEMS speakers)", city: "Graz", state: "Styria", lat: 47.0612, lon: 15.4242, category: "sensors", web: "https://usound.com" },
  { name: "SteadySense (medical sensor patches)", city: "Graz", state: "Styria", lat: 47.0207, lon: 15.4667, category: "sensors", web: "https://steadysense.at" },

  // ===================== RESEARCH INSTITUTIONS =====================
  { name: "Silicon Austria Labs (SAL) – HQ", city: "Graz", state: "Styria", lat: 47.0760, lon: 15.4350, category: "research", web: "https://silicon-austria-labs.com" },
  { name: "Silicon Austria Labs (SAL)", city: "Villach", state: "Carinthia", lat: 46.6383, lon: 13.8447, category: "research", web: "https://silicon-austria-labs.com" },
  { name: "Silicon Austria Labs (SAL)", city: "Linz", state: "Upper Austria", lat: 48.3363, lon: 14.3213, category: "research", web: "https://silicon-austria-labs.com" },
  { name: "Materials Center Leoben (MCL, materials research for microelectronics)", city: "Leoben", state: "Styria", lat: 47.3853, lon: 15.0987, category: "research", web: "https://www.mcl.at" },

  // ===================== UNIVERSITIES / UAS =====================
  { name: "TU Wien – Institute of Microelectronics / ZMNS / ISAS", city: "Vienna", state: "Vienna", lat: 48.1963, lon: 16.3695, category: "university", web: "https://www.tuwien.at/etit" },
  { name: "TU Graz – Institute of Electronics (IFE)", city: "Graz", state: "Styria", lat: 47.0596, lon: 15.4594, category: "university", web: "https://www.tugraz.at/institute/ife/home" },
  { name: "TU Graz – Institute of Technical Informatics (ITI)", city: "Graz", state: "Styria", lat: 47.0578, lon: 15.4606, category: "university", web: "https://www.tugraz.at/institute/iti/home" },
  { name: "JKU Linz – Institute for Microelectronics and Microsensors", city: "Linz", state: "Upper Austria", lat: 48.3362, lon: 14.3194, category: "university", web: "https://www.jku.at" },
  { name: "JKU Linz – Department for Integrated Circuits (ICD)", city: "Linz", state: "Upper Austria", lat: 48.3368, lon: 14.3238, category: "university", web: "https://www.jku.at" },
  { name: "JKU Linz – Institute for Communications Engineering and RF Systems (NTHFS)", city: "Linz", state: "Upper Austria", lat: 48.3362, lon: 14.3194, category: "university", web: "https://www.jku.at/nthfs" },
  { name: "FH Technikum Wien – Dept. Electronic Engineering", city: "Vienna", state: "Vienna", lat: 48.2392, lon: 16.3768, category: "university", web: "https://www.technikum-wien.at/departments/electronic-engineering/" },
  { name: "Carinthia UAS / CIME (IC design, green electronics)", city: "Villach", state: "Carinthia", lat: 46.6065, lon: 13.8388, category: "university", web: "https://www.fh-kaernten.at" },

  // ===================== EMBEDDED, POWER & AUTOMATION =====================
  { name: "TTTech Computertechnik (safety-critical embedded networking, TTA/TSN)", city: "Vienna", state: "Vienna", lat: 48.1909, lon: 16.3567, category: "embedded", web: "https://www.tttech.com" },

  // ===================== CLUSTERS & ASSOCIATIONS =====================
  { name: "SILICON ALPS Cluster", city: "Villach", state: "Carinthia", lat: 46.6058, lon: 13.8401, category: "cluster", web: "https://www.silicon-alps.at" },
  { name: "FEEI – Association of the Electrical and Electronics Industry", city: "Vienna", state: "Vienna", lat: 48.1980, lon: 16.3568, category: "cluster", web: "https://www.feei.at" }
];
