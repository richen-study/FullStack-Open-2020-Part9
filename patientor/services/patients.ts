/* eslint-disable @typescript-eslint/no-unsafe-call */
import patientData from "../data/patients";
import { v4 as uuidv4 } from "uuid";

import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../src/types";

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

/* const addEntry = () => {
  return [];
};
 */
export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
};
