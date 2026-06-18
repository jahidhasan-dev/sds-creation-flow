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
  H221: { text: "Flammable gas", tone: "indigo" },
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
  // ---- additional physical hazards (H2xx) ----
  H204: { text: "Fire or projection hazard", tone: "indigo" },
  H206: { text: "Fire, blast or projection hazard; increased risk of explosion if desensitizing agent is reduced", tone: "indigo" },
  H224: { text: "Extremely flammable liquid and vapour", tone: "indigo" },
  H228: { text: "Flammable solid", tone: "indigo" },
  H240: { text: "Heating may cause an explosion", tone: "indigo" },
  H242: { text: "Heating may cause a fire", tone: "indigo" },
  H250: { text: "Catches fire spontaneously if exposed to air", tone: "indigo" },
  H261: { text: "In contact with water releases flammable gases", tone: "indigo" },
  H270: { text: "May cause or intensify fire; oxidizer", tone: "indigo" },
  H272: { text: "May intensify fire; oxidizer", tone: "indigo" },
  H280: { text: "Contains gas under pressure; may explode if heated", tone: "indigo" },
  H281: { text: "Contains refrigerated gas; may cause cryogenic burns or injury", tone: "indigo" },
  // ---- additional health hazards (H3xx) ----
  H300: { text: "Fatal if swallowed", tone: "red" },
  H303: { text: "May be harmful if swallowed", tone: "red" },
  H310: { text: "Fatal in contact with skin", tone: "red" },
  H312: { text: "Harmful in contact with skin", tone: "red" },
  H313: { text: "May be harmful in contact with skin", tone: "red" },
  H316: { text: "Causes mild skin irritation", tone: "red" },
  H332: { text: "Harmful if inhaled", tone: "red" },
  H334: { text: "May cause allergy or asthma symptoms or breathing difficulties if inhaled", tone: "red" },
  H340: { text: "May cause genetic defects", tone: "red" },
  H341: { text: "Suspected of causing genetic defects", tone: "red" },
  H351: { text: "Suspected of causing cancer", tone: "red" },
  H361: { text: "Suspected of damaging fertility or the unborn child", tone: "red" },
  H372: { text: "Causes damage to organs through prolonged or repeated exposure", tone: "red" },
  H373: { text: "May cause damage to organs through prolonged or repeated exposure", tone: "red" },
  // ---- additional environmental hazards (H4xx) ----
  H402: { text: "Harmful to aquatic life", tone: "green" },
  H404: { text: "Harmful to the aquatic environment", tone: "green" },
  H406: { text: "Harmful to soil organisms with long lasting effects", tone: "green" },
  H408: { text: "Harmful to terrestrial wildlife", tone: "green" },
  H413: { text: "May cause long lasting harmful effects to aquatic life", tone: "green" },
  H420: { text: "Harms public health and the environment by destroying ozone", tone: "green" },
  // ---- supplemental EUH / AUH ----
  EUH014: { text: "Reacts violently with water", tone: "indigo" },
  EUH018: { text: "In use may form flammable/explosive vapour-air mixture", tone: "indigo" },
  EUH029: { text: "Contact with water liberates toxic gas", tone: "indigo" },
  EUH031: { text: "Contact with acids liberates toxic gas", tone: "indigo" },
  EUH032: { text: "Contact with acids liberates very toxic gas", tone: "indigo" },
  EUH059: { text: "Hazardous to the ozone layer", tone: "indigo" },
  EUH066: { text: "Repeated exposure may cause skin dryness or cracking", tone: "indigo" },
  EUH070: { text: "Toxic by eye contact", tone: "indigo" },
  EUH071: { text: "Corrosive to the respiratory tract", tone: "indigo" },
  EUH208: { text: "Contains allergen; may produce an allergic reaction", tone: "indigo" },
  AUH070: { text: "Toxic by eye contact", tone: "indigo" },
};

// Build hazard-code objects from CODE_LIBRARY keys (keeps the 30+ entries below compact)
function mkCodes(...codes) {
  return codes.map((c) => {
    const e = CODE_LIBRARY[c] || { text: "Hazard statement", tone: "indigo" };
    return { code: c, text: e.text, tone: e.tone };
  });
}

// 30 additional searchable chemicals — each carries a spread of H2xx/H3xx/H4xx codes
// so the hazard badges, drawer and final-hazard groups all look full and premium.
Object.assign(CAS_DB, {
  "108-88-3": { name: "Toluene", cas: "108-88-3", hcodes: mkCodes("H225", "H304", "H315", "H336", "H361", "H373", "H412"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "200 ppm" }], tox: [{ result: "LD50", dose: "636 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Pimephales promelas (Fathead minnow)", result: "LC50", value: "12.5 mg/L", duration: "96 hours" }] },
  "67-56-1": { name: "Methanol", cas: "67-56-1", hcodes: mkCodes("H225", "H301", "H311", "H331", "H370"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "200 ppm" }], tox: [{ result: "LD50", dose: "5628 mg/kg", species: "Rat", exposure: "Oral" }], eco: [] },
  "71-43-2": { name: "Benzene", cas: "71-43-2", hcodes: mkCodes("H225", "H304", "H315", "H319", "H340", "H350", "H372", "H412"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "1 ppm" }], tox: [{ result: "LD50", dose: "930 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Daphnia magna", result: "EC50", value: "10 mg/L", duration: "48 hours" }] },
  "108-95-2": { name: "Phenol", cas: "108-95-2", hcodes: mkCodes("H301", "H311", "H314", "H331", "H341", "H373", "H411"),
    exposure: [{ method: "TWA", regulation: "ACGIH TLV", limit: "5 ppm" }], tox: [{ result: "LD50", dose: "317 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Oncorhynchus mykiss (Rainbow trout)", result: "LC50", value: "5.02 mg/L", duration: "96 hours" }] },
  "50-00-0": { name: "Formaldehyde", cas: "50-00-0", hcodes: mkCodes("H301", "H311", "H314", "H317", "H331", "H335", "H341", "H350"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "0.75 ppm" }], tox: [{ result: "LD50", dose: "100 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Daphnia magna", result: "EC50", value: "5.8 mg/L", duration: "48 hours" }] },
  "7722-84-1": { name: "Hydrogen Peroxide", cas: "7722-84-1", hcodes: mkCodes("H271", "H302", "H314", "H332", "H335", "H412"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "1 ppm" }], tox: [{ result: "LD50", dose: "1518 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Pimephales promelas", result: "LC50", value: "16.4 mg/L", duration: "96 hours" }] },
  "1336-21-6": { name: "Ammonium Hydroxide", cas: "1336-21-6", hcodes: mkCodes("H290", "H314", "H335", "H400", "H411"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "50 ppm" }], tox: [{ result: "LD50", dose: "350 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Cyprinus carpio (Carp)", result: "LC50", value: "0.9 mg/L", duration: "96 hours" }] },
  "7664-41-7": { name: "Ammonia (anhydrous)", cas: "7664-41-7", hcodes: mkCodes("H221", "H280", "H314", "H331", "H400"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "50 ppm" }], tox: [{ result: "LC50", dose: "2000 ppm", species: "Rat", exposure: "Inhalation" }], eco: [{ species: "Lepomis macrochirus (Bluegill)", result: "LC50", value: "0.75 mg/L", duration: "96 hours" }] },
  "7697-37-2": { name: "Nitric Acid", cas: "7697-37-2", hcodes: mkCodes("H272", "H290", "H314", "H331"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "2 ppm" }], tox: [{ result: "LD50", dose: "430 mg/kg", species: "Rat", exposure: "Oral" }], eco: [] },
  "75-09-2": { name: "Dichloromethane", cas: "75-09-2", hcodes: mkCodes("H315", "H319", "H335", "H336", "H351", "H373"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "25 ppm" }], tox: [{ result: "LD50", dose: "1600 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Daphnia magna", result: "EC50", value: "27 mg/L", duration: "48 hours" }] },
  "67-66-3": { name: "Chloroform", cas: "67-66-3", hcodes: mkCodes("H302", "H315", "H319", "H331", "H351", "H361", "H372"),
    exposure: [{ method: "TWA", regulation: "ACGIH TLV", limit: "10 ppm" }], tox: [{ result: "LD50", dose: "695 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Daphnia magna", result: "EC50", value: "29 mg/L", duration: "48 hours" }] },
  "78-93-3": { name: "Methyl Ethyl Ketone", cas: "78-93-3", hcodes: mkCodes("H225", "H319", "H336", "EUH066"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "200 ppm" }], tox: [{ result: "LD50", dose: "2737 mg/kg", species: "Rat", exposure: "Oral" }], eco: [] },
  "141-78-6": { name: "Ethyl Acetate", cas: "141-78-6", hcodes: mkCodes("H225", "H319", "H336", "EUH066"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "400 ppm" }], tox: [{ result: "LD50", dose: "5620 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Pimephales promelas", result: "LC50", value: "220 mg/L", duration: "96 hours" }] },
  "67-63-0": { name: "Isopropyl Alcohol", cas: "67-63-0", hcodes: mkCodes("H225", "H319", "H336"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "400 ppm" }], tox: [{ result: "LD50", dose: "5045 mg/kg", species: "Rat", exposure: "Oral" }], eco: [] },
  "110-54-3": { name: "n-Hexane", cas: "110-54-3", hcodes: mkCodes("H225", "H304", "H315", "H336", "H361", "H373", "H411"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "50 ppm" }], tox: [{ result: "LD50", dose: "25000 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Daphnia magna", result: "EC50", value: "2.1 mg/L", duration: "48 hours" }] },
  "1330-20-7": { name: "Xylene", cas: "1330-20-7", hcodes: mkCodes("H226", "H304", "H312", "H315", "H332", "H335", "H412"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "100 ppm" }], tox: [{ result: "LD50", dose: "3523 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Pimephales promelas", result: "LC50", value: "13.4 mg/L", duration: "96 hours" }] },
  "100-41-4": { name: "Ethylbenzene", cas: "100-41-4", hcodes: mkCodes("H225", "H304", "H332", "H351", "H373", "H411"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "100 ppm" }], tox: [{ result: "LD50", dose: "3500 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Oncorhynchus mykiss", result: "LC50", value: "4.2 mg/L", duration: "96 hours" }] },
  "7782-50-5": { name: "Chlorine", cas: "7782-50-5", hcodes: mkCodes("H270", "H280", "H315", "H319", "H330", "H335", "H400"),
    exposure: [{ method: "Ceiling", regulation: "OSHA PEL", limit: "1 ppm" }], tox: [{ result: "LC50", dose: "293 ppm", species: "Rat", exposure: "Inhalation" }], eco: [{ species: "Daphnia magna", result: "EC50", value: "0.028 mg/L", duration: "48 hours" }] },
  "124-38-9": { name: "Carbon Dioxide", cas: "124-38-9", hcodes: mkCodes("H280"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "5000 ppm" }], tox: [], eco: [] },
  "74-82-8": { name: "Methane", cas: "74-82-8", hcodes: mkCodes("H220", "H280"),
    exposure: [{ method: "TWA", regulation: "ACGIH TLV", limit: "1000 ppm" }], tox: [], eco: [] },
  "74-98-6": { name: "Propane", cas: "74-98-6", hcodes: mkCodes("H220", "H280"),
    exposure: [{ method: "TWA", regulation: "ACGIH TLV", limit: "1000 ppm" }], tox: [], eco: [] },
  "1310-58-3": { name: "Potassium Hydroxide", cas: "1310-58-3", hcodes: mkCodes("H290", "H302", "H314"),
    exposure: [{ method: "Ceiling", regulation: "ACGIH TLV", limit: "2 mg/m3" }], tox: [{ result: "LD50", dose: "273 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Gambusia affinis", result: "LC50", value: "80 mg/L", duration: "96 hours" }] },
  "7681-52-9": { name: "Sodium Hypochlorite", cas: "7681-52-9", hcodes: mkCodes("H290", "H314", "H400", "EUH031"),
    exposure: [{ method: "TWA", regulation: "ACGIH TLV", limit: "2 mg/m3" }], tox: [{ result: "LD50", dose: "8910 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Menidia beryllina", result: "LC50", value: "0.09 mg/L", duration: "96 hours" }] },
  "64-19-7": { name: "Acetic Acid", cas: "64-19-7", hcodes: mkCodes("H226", "H290", "H314"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "10 ppm" }], tox: [{ result: "LD50", dose: "3310 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Daphnia magna", result: "EC50", value: "47 mg/L", duration: "48 hours" }] },
  "79-09-4": { name: "Propionic Acid", cas: "79-09-4", hcodes: mkCodes("H226", "H314"),
    exposure: [{ method: "TWA", regulation: "ACGIH TLV", limit: "10 ppm" }], tox: [{ result: "LD50", dose: "1510 mg/kg", species: "Rat", exposure: "Oral" }], eco: [] },
  "7664-39-3": { name: "Hydrofluoric Acid", cas: "7664-39-3", hcodes: mkCodes("H300", "H310", "H314", "H330"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "3 ppm" }], tox: [{ result: "LD50", dose: "1276 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Daphnia magna", result: "EC50", value: "97 mg/L", duration: "48 hours" }] },
  "7783-06-4": { name: "Hydrogen Sulfide", cas: "7783-06-4", hcodes: mkCodes("H220", "H280", "H330", "H400"),
    exposure: [{ method: "Ceiling", regulation: "OSHA PEL", limit: "20 ppm" }], tox: [{ result: "LC50", dose: "444 ppm", species: "Rat", exposure: "Inhalation" }], eco: [{ species: "Lepomis macrochirus", result: "LC50", value: "0.0448 mg/L", duration: "96 hours" }] },
  "110-82-7": { name: "Cyclohexane", cas: "110-82-7", hcodes: mkCodes("H225", "H304", "H315", "H336", "H410"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "300 ppm" }], tox: [{ result: "LD50", dose: "12705 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Oncorhynchus mykiss", result: "LC50", value: "3.96 mg/L", duration: "96 hours" }] },
  "108-90-7": { name: "Chlorobenzene", cas: "108-90-7", hcodes: mkCodes("H226", "H332", "H411"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "75 ppm" }], tox: [{ result: "LD50", dose: "2910 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Pimephales promelas", result: "LC50", value: "7.4 mg/L", duration: "96 hours" }] },
  "121-44-8": { name: "Triethylamine", cas: "121-44-8", hcodes: mkCodes("H225", "H302", "H311", "H314", "H332"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "25 ppm" }], tox: [{ result: "LD50", dose: "460 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Daphnia magna", result: "EC50", value: "32 mg/L", duration: "48 hours" }] },
  "108-94-1": { name: "Cyclohexanone", cas: "108-94-1", hcodes: mkCodes("H226", "H312", "H332"),
    exposure: [{ method: "TWA", regulation: "OSHA PEL", limit: "50 ppm" }], tox: [{ result: "LD50", dose: "1535 mg/kg", species: "Rat", exposure: "Oral" }], eco: [{ species: "Pimephales promelas", result: "LC50", value: "481 mg/L", duration: "96 hours" }] },
});

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
  {
    name: "Industrial Degreaser",
    chemicals: [
      { cas: "108-88-3", actual: "35", pdf: "30-40" },
      { cas: "1330-20-7", actual: "25", pdf: "20-30" },
      { cas: "78-93-3", actual: "20", pdf: "15-25" },
      { cas: "67-63-0", actual: "20", pdf: "15-25" },
    ],
  },
  {
    name: "Lab Reagent Mix",
    chemicals: [
      { cas: "67-56-1", actual: "40", pdf: "35-45" },
      { cas: "75-09-2", actual: "30", pdf: "25-35" },
      { cas: "108-95-2", actual: "15", pdf: "10-20" },
      { cas: "64-19-7", actual: "15", pdf: "10-20" },
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
