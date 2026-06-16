import { useEffect, useState } from "react";
import API from "../api/api";

const Elections = () => {

  const [elections, setElections] = useState([]);

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      const res = await API.get("/election/all");
      setElections(res.data);
    } catch (err) {
      console.error(err);
      alert("Cannot load elections");
    }
  };

  return (
    <div>
      <h1>Manage Elections</h1>

      {elections.map(e => (
        <div key={e.id} style={card}>
          <h3>{e.title}</h3>
          <p>Status: {e.status}</p>
        </div>
      ))}
    </div>
  );
};

const card = {
  background: "white",
  padding: "20px",
  marginTop: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

export default Elections;