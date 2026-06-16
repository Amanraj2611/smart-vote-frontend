import { useEffect, useState } from "react";
import API from "../../api/api";

const ApproveCandidates = () => {

  const [candidates,setCandidates] = useState([]);

  useEffect(()=>{
    loadPending();
  },[]);

  const loadPending = async () => {
    const res = await API.get("/api/admin/pending-candidates");
    setCandidates(res.data);
  };

  const approve = async (id) => {
    await API.put(`/api/admin/approve-candidate/${id}`);
    alert("Candidate Approved ✅");
    loadPending();
  };

  const reject = async (id) => {
    await API.delete(`/api/admin/reject-candidate/${id}`);
    alert("Candidate Rejected ❌");
    loadPending();
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Pending Candidate Applications</h2>

      {candidates.length === 0 && (
        <p>No pending applications</p>
      )}

      {candidates.map(c => (

        <div key={c.id}
             className="card shadow p-3 mb-3">

          <h5>{c.name}</h5>

          <p><b>Party:</b> {c.party}</p>
          <p><b>Bio:</b> {c.biography}</p>
          <p><b>Election:</b> {c.election.title}</p>

          <button
            className="btn btn-success me-2"
            onClick={()=>approve(c.id)}
          >
            Approve
          </button>

            {role === "ADMIN" && (
  <Link to="/approve-candidates">
     Candidate Approval
  </Link>
)}

          <button
            className="btn btn-danger"
            onClick={()=>reject(c.id)}
          >
            Reject
          </button>

        </div>
      ))}

    </div>
  );
};

export default ApproveCandidates;