import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Table } from "@nextui-org/react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { SearchBox } from "./searchBox";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hyaXNqb2huc29ucHIiLCJhIjoiY2w1cGU5MmZrMW1hZDNtbndubjRkZ2k1YSJ9.MDWQRkczoSX32F5DcUDddA";

const MapComponent2 = ({ addingMarker, setAddingMarker, setMarkerData }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/chrisjohnsonpr/clgs594hv003k01pie798e370",
        center: [-68.137343, 45.137451],
        zoom: 4,
      });
      const navigationControl = new mapboxgl.NavigationControl();
      map.addControl(navigationControl, "top-right");
      map.addControl(new mapboxgl.FullscreenControl(), "top-right");

      map.on("load", () => {
        setMap(map);

        const draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: true,
            trash: true,
          },
        });
        map.addControl(draw, "top-right");

        // Add event listener for when a draw.create event is fired
        map.on("draw.create", function (e) {
          const data = draw.getAll();
          if (data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates[0];
            console.log(coordinates); // You can replace this with setMarkerData or another function to save the coordinates
          }
        });
      });
    };

    if (!map) {
      initializeMap();
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  const handleAddMarker = () => {
    setAddingMarker(true);
  };

  const handleRemoveMarker = (marker) => {
    const updatedMarkers = markers.filter((m) => m !== marker);
    setMarkers(updatedMarkers);
    marker.remove();
  };

  useEffect(() => {
    if (map && addingMarker) {
      const handleMapClick = (e) => {
        const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
        setMarkerData((prevData) => [...prevData, e.lngLat]);
        setAddingMarker(false);

        console.log("Latitude:", e.lngLat.lat);
        console.log("Longitude:", e.lngLat.lng);
      };

      map.on("click", handleMapClick);

      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [map, addingMarker]);

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <div
        ref={mapContainerRef}
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={handleAddMarker}
            style={{
              padding: "8px 16px",
              backgroundColor: "#fff",
              color: "#000",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            Add Marker
          </button>
          {addingMarker && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#edeff2",
                padding: "8px",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                zIndex: 1,
              }}
            >
              Click on the map to add a marker
            </div>
          )}
        </div>
        {markers.length > 0 && (
          <div>
            <h3>Markers:</h3>
            <ul style={{ color: "white" }}>
              {markers.map((marker, index) => (
                <li key={index}>
                  Marker {index + 1}{" "}
                  <button onClick={() => handleRemoveMarker(marker)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 right-0 w-1/4 z-10 p-4">
        <SearchBox
          defaultValue=""
          onSelectAddress={(_address, latitude, longitude) => {
            if (latitude && longitude && map) {
              map.flyTo({
                center: [longitude, latitude],
                zoom: 5,
                essential: true,
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default MapComponent2;
