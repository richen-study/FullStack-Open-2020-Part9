import React from "react";
import { Card, Icon, List } from "semantic-ui-react";

import { HospitalEntry as Hospital } from "../types";

const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon color="red" name="hospital symbol" />
        </Card.Header>
        <Card.Meta>by {entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <List>
          <List.Item>
            <List.Header>Discharged on {entry.discharge.date}</List.Header>
            {entry.discharge.criteria}
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;