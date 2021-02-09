/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isString } from "formik";
import { NewPatientEntry, Gender } from "../src/types";

const parseString = (arg: any): string => {
  if (!arg || !isString(arg)) {
    throw new Error(`Incorrect or missing arg:  ${arg}`);
  }

  return arg;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender) || !isString(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

/* const isEntry = (param: any): param is Entry[] => {
  return Object.values(Entry).includes(param);
};

const parseEntryType = (entryType: any): EntryType => {
  if (!Object.values(EntryType).includes(entryType)) {
    throw new Error(`Incorrect or missing type: ${entryType || ""}`);
  }

  return entryType;
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseEntryType(object.type),
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
}; */

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: object.entries,
  };
};

export default toNewPatientEntry;
