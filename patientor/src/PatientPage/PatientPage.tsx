import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Container, Icon, Card } from "semantic-ui-react";

import { Patient } from "../types";
import EntryDetails from './EntryDetails';


const genderIconProps = {
  male: { name: "mars" as const, color: "blue" as const },
  female: { name: "venus" as const, color: "pink" as const },
  other: { name: "genderless" as const, color: "grey" as const },
};

const PatientPage: React.FunctionComponent = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams<{ id: string }>();
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

  if (!patient) return <div>Patient Not Found</div>;



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
