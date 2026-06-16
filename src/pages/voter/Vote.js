import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/vote.css";

const Vote = () => {
  const { id } = useParams(); // electionId
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [election, setElection] = useState(null);

  useEffect(() => {
    loadCandidates();
    loadElection();
  }, [id]);

  const loadCandidates = async () => {
    try {
      const res = await API.get(`/candidate/election/${id}`);
      setCandidates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadElection = async () => {
    try {
      const res = await API.get(`/election/${id}`);
      setElection(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FINAL WORKING VOTE FUNCTION
  const confirmVote = async () => {
    console.log("BUTTON CLICKED");

    if (!selected) {
      alert("⚠ Please select a candidate");
      return;
    }

    try {
      const res = await API.post("/vote", {
        electionId: parseInt(id),
        candidateId: selected.id,
      });

      console.log("API RESPONSE:", res.data);

      if (res.data === "Vote Cast Successfully") {
        alert("✅ Vote Cast Successfully");
        navigate("/voter");
      } else {
        alert("❌ " + res.data);
      }

    } catch (err) {
      console.error(err);
      alert("❌ Error voting");
    }
  };

  return (
    <div className="vote-container">

      <button
        className="nav-back-btn"
        onClick={() => navigate("/voter")}
      >
        ← Back to Dashboard
      </button>

      <div className="vote-header">
        <div>
          <h1>{election?.title}</h1>
          <p>{election?.description}</p>
        </div>
      </div>

      <h2>Select Your Candidate</h2>

      <div className="vote-grid">
        {candidates.map((c) => (
          <div
            key={c.id}
            className={`vote-card ${selected?.id === c.id ? "selected" : ""}`}
            onClick={() => {
              console.log("Selected:", c.id);
              setSelected(c);
            }}
          >
            <h3>{c.name}</h3>
            <p>{c.description}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="confirm-box">
          <h3>Selected: {selected.name}</h3>

          <button
            className="confirm-btn"
            onClick={confirmVote}
          >
            ✔ Confirm Vote
          </button>
        </div>
      )}

    </div>
  );
};

export default Vote;