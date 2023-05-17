import { Card, Col, Row, Button, Text } from "@nextui-org/react";

export const Card2 = () => (
  <Card css={{ w: "100%", h: "400px" }}>
    <Card.Header
      css={{ position: "absolute", zIndex: 1, top: 5 }}
    ></Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src="https://res.cloudinary.com/ddqz7fp5i/image/upload/v1683654003/WEB-2022-06-07-RPP-russia-ukraine-new-phase_eyfedc.png"
        width="100%"
        height="100%"
        objectFit="cover"
        alt="Card example background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#ffffff66",
        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Text size={15} weight="bold" color="#ff0303">
            Ongoing Conflict
          </Text>
          <Text color="#000" size={12}>
            Ukraine War
          </Text>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button flat auto rounded color="secondary">
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                See Updates
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);
