import React, { useState } from "react";
import { useLocalState } from "src/utils/useLocalState";
import Layout from "src/components/layout";
import Map from "src/components/map";
import PopUpComponent from "src/components/PopUpComponent";
import SidebarComponent from "src/components/SidebarComponent";


type BoundsArray = [[number, number], [number, number]];

const parseBounds = (boundsString: string) => {
  const bounds = JSON.parse(boundsString) as BoundsArray;
  return {
    sw: {
      latitude: bounds[0][1],
      longitude: bounds[0][0],
    },
    ne: {
      latitude: bounds[1][1],
      longitude: bounds[1][0],
    },
  };
};

export default function Home() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [dataBounds, setDataBounds] = useLocalState<string>(
    "bounds",
    "[[0,0],[0,0]]"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true); // State for sidebar open/close

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMapClick = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Layout
      main={
        <div className="flex">
          <SidebarComponent
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />

          <div className={`${sidebarOpen ? "w-3/4" : "w-full"}`}>
            <Map setDataBounds={setDataBounds} highlightedId={highlightedId} />
          </div>
          {!sidebarOpen && (
            <button
              className="fixed bottom-4 right-4 bg-gray-500 px-4 py-2 rounded-lg text-white"
              onClick={handleSidebarToggle}
            >
              Show Sidebar
            </button>
          )}
        </div>
      }
    >
      {/* Render the pop-up component */}
      <PopUpComponent highlightedId={highlightedId} />
    </Layout>
  );
}
