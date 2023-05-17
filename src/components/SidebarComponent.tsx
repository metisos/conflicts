import React from "react";
//import Switchcom from "src/components/Switchcom";
import {
  Spacer,
  Container,
  Collapse,
  Card,
  Grid,
  Text,
  Button,
  Row,
} from "@nextui-org/react";
import { Card1 } from "./Card1";
import { Card2 } from "./Card2";
import { Card3 } from "./Card3";
import SupabaseComponent from "./SupabaseComponent";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  sidebarOpen,
  toggleSidebar,
}) => {
  return (
    <div
      className={`w-1/4 pb-4 ${
        sidebarOpen ? "block" : "hidden" // Toggle visibility based on sidebarOpen state
      }`}
      style={{
        maxHeight: "calc(100vh - 64px)",
        overflowX: "scroll",
        backgroundColor: "black",
        borderRadius: "15px",
      }}
    >
      <button
        onClick={toggleSidebar}
        className="bg-gray-500 px-4 py-2 rounded-lg text-white"
      >
        Toggle
      </button>
      <Spacer y={1} />
      {""}
      <Collapse.Group accordion={true}>
        <Collapse
          title="World News"
          className="bg-white  px-4 py-2 rounded-lg text-white "
        >
          <Card>
            <Card.Body>
              <SupabaseComponent />{" "}
              {/* Render the SupabaseComponent inside a Card */}
            </Card.Body>
          </Card>
        </Collapse>
      </Collapse.Group>
      <Spacer y={1} />

      <h3>Watchlist</h3>
      <Card1 />

      <Spacer y={1} />
      <Card2 />
      <Spacer y={1} />
      <Card3 />
      <Spacer y={1} />
    </div>
  );
};

export default SidebarComponent;
