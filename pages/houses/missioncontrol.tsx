import Layout from "src/components/layout";
import MapComponent2 from "src/components/MapComponent2"; // Import the MapComponent

import React, { useState } from "react";
import { useLocalState } from "src/utils/useLocalState";
import WeatherCard from "src/components/WeatherCard";
import SupabaseComponent from "src/components/SupabaseComponent";
import ChatBox from "src/components/chatBox";

import {
  Grid,
  Spacer,
  Card,
  Container,
  Text,
  Col,
  Row,
  Button,
  Table,
  Collapse,
  Textarea,
  Image,
} from "@nextui-org/react";
import { IsFullWidth } from "class-validator";

const Missioncontrol = () => {
  const [addingMarker, setAddingMarker] = useState(false);
  const [markerData, setMarkerData] = useState([]);

  const handleAddMarker = () => {
    setAddingMarker(true);
  };

  return (
    <Layout
      main={
        <div>
          <Container
            gap={0}
            css={{
              position: "relative",
              flexWrap: "wrap",
              height: "auto",
              width: "auto",
            }} // Adjust the height value as needed
          >
            <Card>
              {/* Add the MapComponent here */}
              <MapComponent2
                addingMarker={addingMarker}
                setAddingMarker={setAddingMarker}
                setMarkerData={setMarkerData}
              />
            </Card>
          </Container>
          <Spacer y={1} />
          <Container
            gap={0}
            css={{ d: "flex", flexWrap: "nowrap", height: "300px" }}
          >
            <Card
              css={{
                d: "flex",
                flexWrap: "nowrap",
                mw: "800px",
                overflowY: "auto",
                maxHeight: "300px",
              }}
            >
              <Card.Header>
                <Text b> Global Conflict Dataset</Text>
              </Card.Header>
              <Card.Divider />
              <SupabaseComponent />
            </Card>
            <Spacer y={1} />
            <Grid xs={4}>
              <Card variant="bordered">
                <Card.Header>
                  <Text b>Metis OS Chat</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body>
                  <ChatBox />
                </Card.Body>
              </Card>
            </Grid>
          </Container>
          <Spacer y={1} />
          <Container
            gap={0}
            css={{ d: "flex", flexWrap: "nowrap", height: "300px" }}
          >
            <Grid sm={12} md={5}>
              <Card css={{ mw: "500px" }}>
                <Card.Header>
                  <Text b> Mission Control | Overview</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: "$10" }}>
                  <WeatherCard location="33.8207506,62.4108374" />
                  <Card.Divider />
                  <Text>
                    Territorial changes: Taliban control over Afghanistan
                    increases compared to pre-intervention territory.
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          </Container>
          <Spacer y={1} />{" "}
          <Container
            gap={0}
            css={{
              position: "relative",
              flexWrap: "wrap",
              height: "auto",
              width: "auto",
            }}
          >
            <Spacer y={1} />
            <Card css={{ mw: "500px", overflowY: "auto", maxHeight: "300px" }}>
              <Table
                aria-label="Marker data table"
                animated={true}
                color="secondary"
              >
                <Table.Header>
                  <Table.Column>Marker Dataset</Table.Column>
                  <Table.Column>Latitude</Table.Column>
                  <Table.Column>Longitude</Table.Column>
                  <Table.Column>Edit</Table.Column>
                </Table.Header>
                <Table.Body>
                  {markerData.map((data, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{data.lat.toFixed(2)}</Table.Cell>
                      <Table.Cell>{data.lng.toFixed(2)}</Table.Cell>
                      <Table.Cell>
                        {" "}
                        <Textarea
                          label="Add Data"
                          placeholder="Enter your data."
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
            <Spacer y={1} />
          </Container>
        </div>
      }
    />
  );
};

export default Missioncontrol;
