import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Table, Text } from "@nextui-org/react";

const supabaseUrl = "https://begngpuiwkhprlwrqljt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZ25ncHVpd2tocHJsd3JxbGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2NTQ0NDUsImV4cCI6MTk5NzIzMDQ0NX0.XucBQEvlRYe7-4LGxy6ORWniXny-e7FslhLmwnAx440";

const supabase = createClient(supabaseUrl, supabaseKey);

const SupabaseComponent = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: predictions, error } = await supabase
          .from("predictions")
          .select("*");

        if (error) {
          throw new Error(error.message);
        }

        setData(predictions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    "country",
    "political",
    "economic",
    "social",
    "military",
    "environmental",
    "Most Likely to Occur",
    "Probability of Conflict",
    "Active Conflict",
  ];

  return (
    <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "50%",
        overflowY: "auto",
        maxHeight: "200px", // Set a max-height to enable scrolling
      }}
      selectionMode="single"
    >
      <Table.Header>
        {columns.map((column) => (
          <Table.Column key={column}>{column}</Table.Column>
        ))}
      </Table.Header>
      <Table.Body>
        {data.map((prediction, index) => (
          <Table.Row key={index}>
            {columns.map((column) => (
              <Table.Cell key={column}>{prediction[column]}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default SupabaseComponent;
