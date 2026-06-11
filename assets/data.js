/* ============================================================
   ExactSDS demo — dummy data
   ============================================================ */

// Hazard-code statement dictionary (exact strings from Figma)
const HZ_TEXT = {
  explosive: "(Obsolete) Explosive; mass explosion hazard",
  corrosive: "May be corrosive to metals",
  fire: "Fire hazard; increased risk of explosion if desensitizing agent is reduced",
  flammable: "Highly Flammable liquid and vapor",
};

// tones: indigo | green | red
const CAS_DB = {
  "7664-93-9": {
    name: "Sulfuric Acid",
    cas: "7664-93-9",
    hcodes: [
      { code: "H202", text: HZ_TEXT.explosive, tone: "indigo" },
      { code: "H202", text: HZ_TEXT.corrosive, tone: "green" },
      { code: "H401", text: HZ_TEXT.flammable, tone: "red" },
      { code: "H202", text: HZ_TEXT.fire, tone: "green" },
      { code: "H401", text: HZ_TEXT.flammable, tone: "red" },
    ],
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "1 mg/m3" }],
    tox: [{ result: "LD50", dose: "2140mg/kg", species: "Rat", exposure: "Oral" }],
    eco: [],
  },
  "7647-01-0": {
    name: "Hydrochloric Acid",
    cas: "7647-01-0",
    hcodes: [
      { code: "H202", text: HZ_TEXT.explosive, tone: "indigo" },
      { code: "H202", text: HZ_TEXT.corrosive, tone: "red" },
      { code: "H202", text: HZ_TEXT.fire, tone: "green" },
      { code: "H401", text: HZ_TEXT.flammable, tone: "indigo" },
      { code: "H202", text: HZ_TEXT.fire, tone: "green" },
      { code: "H202", text: HZ_TEXT.fire, tone: "green" },
    ],
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "750 ppm" }],
    tox: [{ result: "LD50", dose: "5800mg/kg", species: "Rat", exposure: "Oral" }],
    eco: [{ species: "Phasianus colchicus (Ring-necked pheasant)", result: "EC50", value: "14852000 ug/L", duration: "14 days" }],
  },
  "1310-73-2": {
    name: "Sodium Hydroxide",
    cas: "1310-73-2",
    hcodes: [
      { code: "H401", text: HZ_TEXT.flammable, tone: "red" },
      { code: "H202", text: HZ_TEXT.corrosive, tone: "green" },
      { code: "H202", text: HZ_TEXT.fire, tone: "green" },
      { code: "H202", text: HZ_TEXT.explosive, tone: "indigo" },
      { code: "H202", text: HZ_TEXT.corrosive, tone: "green" },
      { code: "H401", text: HZ_TEXT.flammable, tone: "red" },
    ],
    exposure: [{ method: "Ceiling", regulation: "OSHA PEL", limit: "2 mg/m3" }],
    tox: [],
    eco: [{ species: "Gambusia affinis (Mosquitofish)", result: "LC50", value: "125000 ug/L", duration: "96 hours" }],
  },
  "67-64-1": {
    name: "Acetone",
    cas: "67-64-1",
    hcodes: [
      { code: "H202", text: HZ_TEXT.corrosive, tone: "indigo" },
      { code: "H401", text: HZ_TEXT.flammable, tone: "red" },
      { code: "H202", text: HZ_TEXT.fire, tone: "green" },
    ],
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "1000 ppm" }],
    tox: [{ result: "LD50", dose: "5800mg/kg", species: "Rat", exposure: "Oral" }],
    eco: [{ species: "Oncorhynchus mykiss (Rainbow trout)", result: "LC50", value: "5540 mg/L", duration: "96 hours" }],
  },
  "64-17-5": {
    name: "Ethanol",
    cas: "64-17-5",
    hcodes: [
      { code: "H225", text: HZ_TEXT.flammable, tone: "red" },
      { code: "H202", text: HZ_TEXT.fire, tone: "green" },
    ],
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "1000 ppm" }],
    tox: [{ result: "LD50", dose: "7060mg/kg", species: "Rat", exposure: "Oral" }],
    eco: [],
  },
};

// GHS code library powering the "Add code" autocomplete
// tones: H2xx physical → indigo, H3xx health → red, H4xx environmental → green, EUH/AUH → indigo
const CODE_LIBRARY = {
  H200: { text: "Unstable explosive", tone: "indigo" },
  H202: { text: HZ_TEXT.explosive, tone: "indigo" },
  H220: { text: "Extremely flammable gas", tone: "indigo" },
  H222: { text: "Extremely flammable aerosol", tone: "indigo" },
  H225: { text: "Highly flammable liquid and vapour", tone: "indigo" },
  H226: { text: "Flammable liquid and vapour", tone: "indigo" },
  H260: { text: "In contact with water releases flammable gases which may ignite spontaneously", tone: "indigo" },
  H271: { text: "May cause fire or explosion; strong oxidizer", tone: "indigo" },
  H290: { text: "May be corrosive to metals", tone: "indigo" },
  H301: { text: "Toxic if swallowed", tone: "red" },
  H302: { text: "Harmful if swallowed", tone: "red" },
  H304: { text: "May be fatal if swallowed and enters airways", tone: "red" },
  H311: { text: "Toxic in contact with skin", tone: "red" },
  H314: { text: "Causes severe skin burns and eye damage", tone: "red" },
  H315: { text: "Causes skin irritation", tone: "red" },
  H317: { text: "May cause an allergic skin reaction", tone: "red" },
  H318: { text: "Causes serious eye damage", tone: "red" },
  H319: { text: "Causes serious eye irritation", tone: "red" },
  H330: { text: "Fatal if inhaled", tone: "red" },
  H331: { text: "Toxic if inhaled", tone: "red" },
  H335: { text: "May cause respiratory irritation", tone: "red" },
  H336: { text: "May cause drowsiness or dizziness", tone: "red" },
  H350: { text: "May cause cancer", tone: "red" },
  H360: { text: "May damage fertility or the unborn child", tone: "red" },
  H370: { text: "Causes damage to organs", tone: "red" },
  H400: { text: "Very toxic to aquatic life", tone: "green" },
  H401: { text: "Toxic to aquatic life", tone: "green" },
  H410: { text: "Very toxic to aquatic life with long lasting effects", tone: "green" },
  H411: { text: "Toxic to aquatic life with long lasting effects", tone: "green" },
  H412: { text: "Harmful to aquatic life with long lasting effects", tone: "green" },
  EUH014: { text: "Reacts violently with water", tone: "indigo" },
  EUH031: { text: "Contact with acids liberates toxic gas", tone: "indigo" },
  EUH070: { text: "Toxic by eye contact", tone: "indigo" },
  EUH071: { text: "Corrosive to the respiratory tract", tone: "indigo" },
  AUH070: { text: "Toxic by eye contact", tone: "indigo" },
};

// Presets — bulk add chemicals
const PRESETS = [
  {
    name: "Acid Cleaner Concentrate",
    chemicals: [
      { cas: "7664-93-9", actual: "20", pdf: "50-60" },
      { cas: "7647-01-0", actual: "56", pdf: "78" },
      { cas: "1310-73-2", actual: "20", pdf: "50-60" },
      { cas: "67-64-1", actual: "21,0", pdf: "45,7" },
    ],
  },
  {
    name: "Solvent Blend A",
    chemicals: [
      { cas: "67-64-1", actual: "60", pdf: "55-65" },
      { cas: "64-17-5", actual: "40", pdf: "35-45" },
    ],
  },
];

// UN/ID lookup for Section 14
const UN_DB = {
  "1090": { shipping: "ACETONE", classDiv: "3", packing: "II", subRisk: "—" },
  "1830": { shipping: "SULPHURIC ACID", classDiv: "8", packing: "II", subRisk: "—" },
  "1789": { shipping: "HYDROCHLORIC ACID", classDiv: "8", packing: "II", subRisk: "—" },
  "1824": { shipping: "SODIUM HYDROXIDE SOLUTION", classDiv: "8", packing: "II", subRisk: "—" },
};

const COUNTRIES = ["United States", "United Kingdom", "Germany", "France", "Norway", "Sweden", "Denmark", "Netherlands", "Spain", "Italy", "Japan", "Australia", "Canada", "Bangladesh"];
const LANGUAGES = ["English", "German", "French", "Spanish", "Norwegian", "Swedish", "Danish", "Dutch", "Italian", "Japanese"];
const REGULATIONS = ["GHS (Rev. 9)", "EU CLP (EC 1272/2008)", "US OSHA HazCom 2012", "Australia GHS", "UK REACH"];
const SOLUBILITIES = ["Miscible", "Soluble", "Partially soluble", "Insoluble", "Reacts with water"];
const MIXTURE_STATES = ["Liquid", "Solid", "Gas", "Aerosol", "Paste / Gel"];
const TRANSPORT_MODES = ["ROAD (ADR)", "RAIL (RID)", "SEA (IMDG)", "AIR (IATA)"];
const COMPANIES = ["ExactSDS Inc.", "Nordic Chem AB", "BlueLab Industries"];
