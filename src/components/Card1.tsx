import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { useAuth } from "src/auth/useAuth";

export const Card1 = () => {
  const linkClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const nodeName = e.currentTarget?.nodeName;

    if (nodeName === "A") {
      // Handle the link click event
      // ...
    }
  };

  return (
    <Card css={{ w: "100%", h: "400px" }}>
      <Card.Header
        css={{ position: "absolute", zIndex: 1, top: 5 }}
      ></Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src="https://res.cloudinary.com/ddqz7fp5i/image/upload/v1680571679/58172185_605_dadhf7.jpg"
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
              Afghanistan War
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Link href="/houses/missioncontrol">
                <a>
                  <Button
                    flat
                    auto
                    rounded
                    color="secondary"
                    onClick={linkClicked}
                  >
                    <Text
                      css={{ color: "inherit" }}
                      size={12}
                      weight="bold"
                      transform="uppercase"
                    >
                      See Updates
                    </Text>
                  </Button>
                </a>
              </Link>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
