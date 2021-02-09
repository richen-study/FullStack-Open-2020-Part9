import diagnoseData from "../data/diagnoses";

import { Diagnosis, NonSensitiveDiagnoseEntry } from "../types";

const diagnoses: Array<Diagnosis> = diagnoseData;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

const getNonSensitiveEntries = (): NonSensitiveDiagnoseEntry[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name,
  }));
};

/* const addEntry = () => {
  return [];
};
 */
export default {
  getEntries,
  getNonSensitiveEntries,
};
