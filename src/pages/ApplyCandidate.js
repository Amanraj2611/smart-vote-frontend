import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/applyCandidate.css";

const ApplyCandidate = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [biography, setBiography] = useState("");

  const submitApplication = async () => {
    try {

      await API.post(`/api/election/apply/${id}`, {
        name,
        party,
        biography
      });

      alert("✅ Application Submitted Successfully!");
      navigate("/elections");

    } catch (err) {
      alert("❌ Application Failed");
    }
  };

  return (
    <div className="apply-page">

      <div className="apply-card">

        <div className="apply-header">
          <h2>Apply as Candidate</h2>
          <p>Fill your details to participate in this election</p>
        </div>

        <div className="form-group">
          <label>Candidate Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Party / Organization</label>
          <input
            type="text"
            placeholder="Independent / Party Name"
            value={party}
            onChange={(e)=>setParty(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Biography</label>
          <textarea
            rows="5"
            placeholder="Tell voters about yourself, goals, and experience..."
            value={biography}
            onChange={(e)=>setBiography(e.target.value)}
          />
        </div>

        <div className="btn-group">
          <button className="btn-submit" onClick={submitApplication}>
            Submit Application
          </button>

          <button
            className="btn-cancel"
            onClick={()=>navigate("/elections")}
          >
            Cancel
          </button>
        </div>

      </div>

    </div>
  );
};

export default ApplyCandidate;