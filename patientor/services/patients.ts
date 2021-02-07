import patientData from "../data/patients";

import { PatientEntry, NonSensitivePatientEntry } from "../types";

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
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
