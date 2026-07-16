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
  { name: "Infineon Technologies Austria (HQ + power semiconductor fab)", city: "Villach", state: "Carinthia", lat: 46.5953, lon: 13.8562, category: "semiconductor", web: "https://www.infineon.com/austria" },
  { name: "ams OSRAM (sensor fab)", city: "Premstätten", state: "Styria", lat: 46.9768, lon: 15.3963, category: "semiconductor", web: "https://ams-osram.com" },
  { name: "Vishay Semiconductor Austria", city: "Vöcklabruck", state: "Upper Austria", lat: 48.0039, lon: 13.673, category: "semiconductor", web: "https://www.vishay.com" },

  // ===================== CHIP DESIGN / FABLESS / DESIGN CENTERS =====================
  { name: "semify (digital ASIC design & verification)", city: "Graz", state: "Styria", lat: 47.0774, lon: 15.4314, category: "design", web: "https://www.semify-eda.com" },
  { name: "Photeon Technologies (silicon photonics chip design)", city: "Dornbirn", state: "Vorarlberg", lat: 47.4051, lon: 9.7426, category: "design", web: "https://www.photeon.com" },
  { name: "Infineon Technologies Austria (design center)", city: "Graz", state: "Styria", lat: 47.0729, lon: 15.4211, category: "design", web: "https://www.infineon.com/austria" },
  { name: "Infineon Technologies Austria (design center)", city: "Klagenfurt", state: "Carinthia", lat: 46.6139, lon: 14.2643, category: "design", web: "https://www.infineon.com/austria" },
  { name: "Infineon Technologies (design center)", city: "Linz", state: "Upper Austria", lat: 48.3267, lon: 14.3232, category: "design", web: "https://www.infineon.com/austria" },
  { name: "NXP Semiconductors Austria (security/RFID IC design)", city: "Gratkorn", state: "Styria", lat: 47.1284, lon: 15.3413, category: "design", web: "https://www.nxp.com" },
  { name: "Apple (design center)", city: "Linz", state: "Upper Austria", lat: 48.3117, lon: 14.3142, category: "design", web: "https://www.apple.com" },
  { name: "Bridgecom Semiconductors (fabless, cellular IoT modems)", city: "Linz", state: "Upper Austria", lat: 48.3121, lon: 14.2989, category: "design", web: "https://www.bridgecom-semiconductors.com" },
  { name: "Intel Austria (analog/mixed-signal IP for 5G)", city: "Villach", state: "Carinthia", lat: 46.6104, lon: 13.8843, category: "design", web: "https://www.intel.com" },
  { name: "Qualcomm Austria RFFE (RF front-end development)", city: "Deutschlandsberg", state: "Styria", lat: 46.8222, lon: 15.2318, category: "design", web: "https://www.qualcomm.com" },
  { name: "Qualcomm Research Austria", city: "Salzburg", state: "Salzburg", lat: 47.8057, lon: 13.0451, category: "design", web: "https://www.qualcomm.com/research/locations/austria" },
  { name: "Renesas Electronics (formerly Panthronics, NFC chips)", city: "Graz", state: "Styria", lat: 47.0389, lon: 15.4639, category: "design", web: "https://www.renesas.com" },
  { name: "STMicroelectronics Austria (NFC/UWB Competence Center)", city: "Graz", state: "Styria", lat: 47.0612, lon: 15.4137, category: "design", web: "https://www.st.com" },
  { name: "CISC Semiconductor (RFID/NFC/RISC-V engineering)", city: "Klagenfurt", state: "Carinthia", lat: 46.6133, lon: 14.2646, category: "design", web: "https://www.cisc.at" },
  { name: "Bosch (Robert Bosch AG, automotive electronics development)", city: "Linz", state: "Upper Austria", lat: 48.3074, lon: 14.3091, category: "design", web: "https://www.bosch.at" },
  { name: "Broadcom", city: "Vienna", state: "Vienna", lat: 48.1701, lon: 16.334, category: "design", web: "https://www.broadcom.com" },
  { name: "Symbiotic EDA (formal verification EDA tools)", city: "Vienna", state: "Vienna", lat: 48.1501, lon: 16.39, category: "design", web: "https://www.symbioticeda.com" },
  { name: "YosysHQ (open-source synthesis & formal tools)", city: "Vienna", state: "Vienna", lat: 48.2272, lon: 16.3057, category: "design", web: "https://www.yosyshq.com" },
  { name: "MED-EL (hearing implants, cochlear/middle ear implant development & manufacturing)", city: "Innsbruck", state: "Tyrol", lat: 47.2628, lon: 11.3741, category: "design", web: "https://www.medel.com" },
  { name: "Global TCAD Solutions (TCAD process/device simulation, EDA; TU Wien spin-off)", city: "Vienna", state: "Vienna", lat: 48.2008, lon: 16.3720, category: "design", web: "https://www.globaltcad.com" },
  { name: "DR YIELD (semiconductor yield analytics / AI software)", city: "Graz", state: "Styria", lat: 47.0703, lon: 15.4448, category: "design", web: "https://dryield.com" },

  // ===================== COMPONENTS, SUBSTRATES, PACKAGING & EMS =====================
  { name: "AT&S Austria Technologie & Systemtechnik (IC substrates, HDI PCB)", city: "Leoben", state: "Styria", lat: 47.3585, lon: 15.0677, category: "components", web: "https://ats.net" },
  { name: "TDK Electronics (formerly EPCOS, passives/piezo)", city: "Deutschlandsberg", state: "Styria", lat: 46.8222, lon: 15.2318, category: "components", web: "https://www.tdk-electronics.tdk.com" },

  // ===================== EQUIPMENT & MASKS =====================
  { name: "EV Group (EVG, wafer bonding & lithography)", city: "St. Florian am Inn", state: "Upper Austria", lat: 48.4308, lon: 13.4444, category: "equipment", web: "https://www.evgroup.com" },
  { name: "IMS Nanofabrication (Intel, multibeam mask writer)", city: "Brunn am Gebirge", state: "Lower Austria", lat: 48.1186, lon: 16.2937, category: "equipment", web: "https://www.ims.co.at" },
  { name: "Lam Research Austria (formerly SEZ, wet process)", city: "Villach", state: "Carinthia", lat: 46.6194, lon: 13.836, category: "equipment", web: "https://www.lamresearch.com" },
  { name: "Semsysco (Lam Research, wet chemistry)", city: "Salzburg", state: "Salzburg", lat: 47.7945, lon: 13.0121, category: "equipment", web: "https://www.lamresearch.com" },
  { name: "BESI Austria (formerly Datacon, die attach/packaging)", city: "Radfeld", state: "Tyrol", lat: 47.4501, lon: 11.909, category: "equipment", web: "https://www.besi.com" },
  { name: "F&S BONDTEC Semiconductor (wire bonders & bond testers)", city: "Braunau am Inn", state: "Upper Austria", lat: 48.2464, lon: 13.0556, category: "equipment", web: "https://www.fsbondtec.at" },
  { name: "T.I.P.S. Messtechnik (semiconductor test interfaces)", city: "Villach", state: "Carinthia", lat: 46.6126, lon: 13.8497, category: "equipment", web: "https://www.tips.co.at" },
  { name: "Siconnex (wet-process / wet-chemistry equipment for semiconductor fabs)", city: "Hof bei Salzburg", state: "Salzburg", lat: 47.8117, lon: 13.1725, category: "equipment", web: "https://www.siconnex.com" },
  { name: "mechatronic Systemtechnik (automated semiconductor wafer-handling equipment)", city: "Fürnitz", state: "Carinthia", lat: 46.5760, lon: 13.8340, category: "equipment", web: "https://www.mechatronic.at" },
  { name: "Ortner Reinraumtechnik (cleanroom & decontamination systems)", city: "Villach", state: "Carinthia", lat: 46.6200, lon: 13.8470, category: "equipment", web: "https://ortner-group.com" },

  // ===================== MATERIALS =====================
  { name: "Plansee SE (refractory metals, sputter targets, EUV components)", city: "Reutte", state: "Tyrol", lat: 47.4946, lon: 10.7368, category: "material", web: "https://www.plansee.com" },
  { name: "RHP-Technology (sputter targets, PV material recycling)", city: "Seibersdorf", state: "Lower Austria", lat: 47.9747, lon: 16.5078, category: "material", web: "https://www.rhp-technology.com" },
  { name: "EEMCO (SiC single-crystal growth for power devices)", city: "Leonding", state: "Upper Austria", lat: 48.2758, lon: 14.2528, category: "material", web: "https://eemco.at" },

  // ===================== SENSORS & MEASUREMENT TECHNOLOGY (incl. MEMS) =====================
  { name: "USound (MEMS speakers)", city: "Graz", state: "Styria", lat: 47.0612, lon: 15.4137, category: "sensors", web: "https://usound.com" },
  { name: "SteadySense (medical sensor patches)", city: "Graz", state: "Styria", lat: 47.0285, lon: 15.4872, category: "sensors", web: "https://steadysense.at" },

  // ===================== RESEARCH INSTITUTIONS =====================
  { name: "Silicon Austria Labs (SAL) – HQ", city: "Graz", state: "Styria", lat: 47.0588, lon: 15.4578, category: "research", web: "https://silicon-austria-labs.com" },
  { name: "Silicon Austria Labs (SAL)", city: "Villach", state: "Carinthia", lat: 46.6094, lon: 13.8849, category: "research", web: "https://silicon-austria-labs.com" },
  { name: "Silicon Austria Labs (SAL)", city: "Linz", state: "Upper Austria", lat: 48.3347, lon: 14.3248, category: "research", web: "https://silicon-austria-labs.com" },
  { name: "Materials Center Leoben (MCL, materials research for microelectronics)", city: "Leoben", state: "Styria", lat: 47.38, lon: 15.0903, category: "research", web: "https://www.mcl.at" },
  { name: "Joanneum Research – MATERIALS (sensors, photonics, printed & hybrid electronics)", city: "Weiz", state: "Styria", lat: 47.2196, lon: 15.6250, category: "research", web: "https://www.joanneum.at/materials/en/" },

  // ===================== UNIVERSITIES / UAS =====================
  { name: "TU Wien – Institute of Microelectronics / ZMNS / ISAS", city: "Vienna", state: "Vienna", lat: 48.1961, lon: 16.3699, category: "university", web: "https://www.tuwien.at/etit" },
  { name: "TU Graz – Institute of Electronics (IFE)", city: "Graz", state: "Styria", lat: 47.0591, lon: 15.4597, category: "university", web: "https://www.tugraz.at/institute/ife/home" },
  { name: "TU Graz – Institute of Technical Informatics (ITI)", city: "Graz", state: "Styria", lat: 47.0583, lon: 15.4581, category: "university", web: "https://www.tugraz.at/institute/iti/home" },
  { name: "JKU Linz – Institute for Microelectronics and Microsensors", city: "Linz", state: "Upper Austria", lat: 48.3362, lon: 14.3234, category: "university", web: "https://www.jku.at" },
  { name: "JKU Linz – Department for Integrated Circuits (ICD)", city: "Linz", state: "Upper Austria", lat: 48.3347, lon: 14.3248, category: "university", web: "https://www.jku.at" },
  { name: "JKU Linz – Institute for Communications Engineering and RF Systems (NTHFS)", city: "Linz", state: "Upper Austria", lat: 48.3360, lon: 14.3236, category: "university", web: "https://www.jku.at/nthfs" },
  { name: "FH Technikum Wien – Dept. Electronic Engineering", city: "Vienna", state: "Vienna", lat: 48.2392, lon: 16.3774, category: "university", web: "https://www.technikum-wien.at/departments/electronic-engineering/" },
  { name: "Carinthia UAS / CIME (IC design, green electronics)", city: "Villach", state: "Carinthia", lat: 46.6111, lon: 13.8838, category: "university", web: "https://www.fh-kaernten.at" },
  { name: "FH JOANNEUM – Institute of Electronic Engineering (embedded systems, power electronics, FPGA/PCB design, RF)", city: "Graz", state: "Styria", lat: 47.0697, lon: 15.4096, category: "university", web: "https://www.fh-joanneum.at/institut/electronic-engineering/" },
  { name: "FH JOANNEUM – Institute of Electronic Engineering (system test engineering)", city: "Kapfenberg", state: "Styria", lat: 47.4536, lon: 15.3320, category: "university", web: "https://www.fh-joanneum.at/institut/electronic-engineering/" },

  // ===================== EMBEDDED, POWER & AUTOMATION =====================
  { name: "TTTech Computertechnik (safety-critical embedded networking, TTA/TSN)", city: "Vienna", state: "Vienna", lat: 48.1949, lon: 16.3616, category: "embedded", web: "https://www.tttech.com" },
  { name: "CHERRY Embedded Solutions (ex-Theobroma Systems, embedded SoM/SBC design)", city: "Vienna", state: "Vienna", lat: 48.2265, lon: 16.5050, category: "embedded", web: "https://embedded.cherry.de" },

  // ===================== CLUSTERS & ASSOCIATIONS =====================
  { name: "SILICON ALPS Cluster", city: "Villach", state: "Carinthia", lat: 46.6094, lon: 13.8849, category: "cluster", web: "https://www.silicon-alps.at" },
  { name: "FEEI – Association of the Electrical and Electronics Industry", city: "Vienna", state: "Vienna", lat: 48.1998, lon: 16.3553, category: "cluster", web: "https://www.feei.at" }
];
