import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DescriptionPageRegistered from "./DescriptionPageRegistered";
import DescriptionPageCancel from "./DescriptionPageCancel";

function EventPage() {
  const { id } = useParams();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("welcome", { replace: true });
      return;
    }

    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `https://campushub.web.id/api/events/${id}/kode-unik`, 
            {
                method: "GET",
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.ok) {
          setStatus("registered"); 
        } else {
          setStatus("cancelled"); 
        }
      } catch (error) {
        setError(response.message);
      }
    };

    fetchStatus();
  }, [id]);

  if (status === "registered") {
    return <DescriptionPageRegistered />;
  }

  if (status === "cancelled") {
    return <DescriptionPageCancel />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader w-16 h-16 border-blue-500 border-t-transparent"></div>
    </div>
  );
}

export default EventPage;
