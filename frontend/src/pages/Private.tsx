// src/pages/Private.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const Private: React.FC = () => {
  const { getToken } = useAuth();
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await fetch("http://localhost:3000/private", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getToken]);

  return <div>{data ? data : "Loading..."}</div>;
};

export default Private;
