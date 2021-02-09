/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {toNewPatient, toNewEntry} from "../utils";
import express from "express";
import patientService from "../services/patients";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const NewPatientEntry = toNewPatient(req.body);

    const addedEntry = patientService.addPatient(NewPatientEntry);
    res.json(addedEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const updatedPatient = patientService.addEntry(patient, newEntry);
      res.json(updatedPatient);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  } else {
    res.status(404).send({ error: "Sorry, this patient does not exist" });
  }
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
