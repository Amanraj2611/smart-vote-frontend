import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import AddCandidateModal from "../../components/AddCandidateModal";
import toast from "react-hot-toast";

import "../../styles/manage.css";

const ManageElection = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [election,setElection] = useState(null);
  const [candidates,setCandidates] = useState([]);
  const [showModal,setShowModal] = useState(false);

  useEffect(()=>{
    loadElection();
    loadCandidates();
  },[]);

  const loadElection = async ()=>{
    try{
      const res = await API.get(`/election/${id}`);
      setElection(res.data);
    }catch(err){
      console.log("Election Load Error:", err);
    }
  };

  const loadCandidates = async ()=>{
    try{
      const res = await API.get(`/candidate/election/${id}`);
      setCandidates(res.data);
    }catch(err){
      console.log("Candidate Load Error:", err);
    }
  };

  const changeStatus = async (status)=>{
  try{
    await API.put(`/election/status/${id}`,{ status });

    toast.success("Status Updated 🔄");

    loadElection();
  }catch(err){
    toast.error("Failed to update status");
  }
};
  const deleteCandidate = async (cid)=>{
  try{
    await API.delete(`/candidate/${cid}`);

    toast.success("Candidate Deleted 🗑");

    loadCandidates();

  }catch(err){
    toast.error("Delete Failed ❌");
  }
};

  const deleteElection = async ()=>{

  try{

    if(!window.confirm("Delete this election?")) return;

    await API.delete(`/election/${id}`);

    toast.success("Election Deleted 🚨");

    navigate("/admin");

  }catch(err){
    toast.error("Delete Failed ❌");
  }

};

  if(!election) return <p>Loading...</p>;

  return(

    <div className="manage-container">

      

      <h1 className="election-title">{election.title}</h1>

      <p className="election-desc">{election.description}</p>

      <span className="status-badge">{election.status}</span>

      <div className="stats">

        <div className="card">

          <p>Election Status</p>

          <select
          value={election.status}
          onChange={(e)=>changeStatus(e.target.value)}
          >

            <option value="UPCOMING">Upcoming</option>
            <option value="OPEN">Active</option>
            <option value="ENDED">Ended</option>

          </select>

        </div>

        <div className="card">
          <p>Total Votes</p>
          <h2>{election.totalVotes || 0}</h2>
        </div>

        <div className="card">
          <p>Total Candidates</p>
          <h2>{candidates.length}</h2>
        </div>

      </div>

      <div className="candidate-section">

        <div className="candidate-header">

          <h3>Candidates</h3>

          <button
          className="add-btn"
          onClick={()=>setShowModal(true)}
          >
            + Add Candidate
          </button>

        </div>

        <div className="candidate-grid">

          {candidates.map(c=>(

            <div className="candidate-card" key={c.id}>

              <div className="avatar">👤</div>

              <h4>{c.name}</h4>

              <p>{c.description}</p>

              <button
              className="delete-btn"
              onClick={()=>deleteCandidate(c.id)}
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

      <div className="danger-zone">

        <h3>Danger Zone</h3>

        <p>
          Deleting this election will permanently remove all candidates and votes.
        </p>

        <button
        className="danger-btn"
        onClick={deleteElection}
        >
          Delete Election
        </button>

      </div>

      {showModal &&

        <AddCandidateModal
          electionId={id}
          close={()=>setShowModal(false)}
          reload={loadCandidates}
        />

      }

    </div>

  );

};

export default ManageElection;