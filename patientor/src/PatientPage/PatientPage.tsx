/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Container, Icon, Card, Button } from "semantic-ui-react";
import { InvalidPatientError } from "../errorHelper";

import { Patient, NewEntry, EntryType } from "../types";

import { useStateValue, updatePatient } from "../state";
import EntryDetails from './EntryDetails';
import AddEntryForm from '../AddEntryModal';


const genderIconProps = {
  male: { name: "mars" as const, color: "blue" as const },
  female: { name: "venus" as const, color: "pink" as const },
  other: { name: "genderless" as const, color: "grey" as const },
};

const PatientPage: React.FunctionComponent = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);

  
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patient);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient().catch((error) => console.log(error));
  }, []);

  
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!patient) return <div>Patient Not Found</div>;


  const submitNewEntry = async (values: NewEntry) => {
    const body = { ...values };

    if (body.type === EntryType.OccupationalHealthCare) {
      if (!body.sickLeave?.endDate && !body.sickLeave?.startDate) {
        body.sickLeave = undefined;
      }
    }

    try {
      const { data: returnedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        body
      );
      dispatch(updatePatient(returnedPatient));
      closeModal();
    } catch (e) {
      console.log(e);

      const errorMessage = "Oops! Something went wrong!";

      setError(errorMessage);
    }
  };



  return (
    <Container>

      <div>{patient.name} <Icon {...genderIconProps[patient.gender]} /></div>

      <p>
        <strong>SSN:</strong> {patient.ssn}
      </p>

      <p>
        <strong>Date of Birth:</strong> {patient.dateOfBirth}
      </p>

      <p>
        <strong>Occupation:</strong> {patient.occupation}
      </p>

      <AddEntryForm
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={openModal}>Add New Entry</Button>

      {patient.entries.length > 0 && <h2>Entries</h2>}

      <Card.Group>
        {patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </Card.Group>
    </Container>

  
  );
};

export default PatientPage;
