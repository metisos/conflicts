import React from "react";
import { Marker, Popup } from "react-map-gl";
import { createClient } from "@supabase/supabase-js";
import { Conflict } from "../types";

const supabaseUrl = "https://begngpuiwkhprlwrqljt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZ25ncHVpd2tocHJsd3JxbGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2NTQ0NDUsImV4cCI6MTk5NzIzMDQ0NX0.XucBQEvlRYe7-4LGxy6ORWniXny-e7FslhLmwnAx440";
const supabase = createClient(supabaseUrl, supabaseKey);

interface IProps {
  conflict: Conflict;
  highlightedId: string | null;
  closePopup: () => void;
}

const CustomMarker: React.FC<IProps> = ({
  conflict,
  highlightedId,
  closePopup,
}) => {
  const handleClick = async () => {
    try {
      // Fetch conflict details from Supabase based on the conflict ID
      const { data: conflictData, error } = await supabase
        .from("conflicts")
        .select("*")
        .eq("id", conflict.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Handle the conflict details
      console.log("Conflict details:", conflictData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Marker latitude={conflict.latitude} longitude={conflict.longitude}>
      <div
        className="marker"
        onClick={handleClick}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor:
            highlightedId === conflict.id.toString() ? "red" : "green",
          cursor: "pointer",
        }}
      ></div>
      {highlightedId === conflict.id.toString() && (
        <Popup
          latitude={conflict.latitude}
          longitude={conflict.longitude}
          onClose={closePopup}
        >
          {/* PopUpComponent goes here */}
        </Popup>
      )}
    </Marker>
  );
};

export default CustomMarker;
