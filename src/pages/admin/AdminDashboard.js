import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

import CreateElectionModal from "../../components/CreateElectionModal";
import "../../styles/admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [elections, setElections] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      const res = await API.get("/election/all");
      setElections(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Stats
  const total = elections.length;
  const active = elections.filter(e => e.status === "OPEN").length;
  const upcoming = elections.filter(e => e.status === "UPCOMING").length;

  const totalVotes = elections.reduce(
    (sum, e) => sum + (e.totalVotes || 0),
    0
  );

  return (
    <div className="admin-page">

      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Election Management</h1>
          <p className="desc">Create and manage elections, view results.</p>
        </div>

        <div className="header-right">
          <button
            className="create-btn"
            onClick={() => setShowModal(true)}
          >
            + Create Election
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Elections</h4>
          <h2>{total}</h2>
        </div>

        <div className="stat-card">
          <h4>Active</h4>
          <h2>{active}</h2>
        </div>

        <div className="stat-card">
          <h4>Upcoming</h4>
          <h2 style={{ color: "#2563eb" }}>{upcoming}</h2>
        </div>

        <div className="stat-card">
          <h4>Total Votes</h4>
          <h2>{totalVotes}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">

        {/* TITLE */}
        <div className="table-title">
          <h3>All Elections</h3>
        </div>

        {/* HEADER */}
        <div className="table-header">
          <div>Election</div>
          <div>Status</div>
          <div>Votes</div>
          <div>Actions</div>
        </div>

        {/* BODY */}
        <div className="table-body">
          {elections.map(e => (
            <div key={e.id} className="table-row">

              <div>
                <div className="title">{e.title}</div>
                <div className="desc">{e.description}</div>
              </div>

              <div>
                <span className={`status ${e.status.toLowerCase()}`}>
                  {e.status}
                </span>
              </div>

              <div>{e.totalVotes || 0}</div>

              <div className="actions">
                <button
                  className="manage-btn"
                  onClick={() => navigate(`/admin/manage/${e.id}`)}
                >
                  ⚙ Manage
                </button>

                <button
                  className="results-btn"
                  onClick={() => navigate(`/admin/results/${e.id}`)}
                >
                  📊 Results
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <CreateElectionModal
          close={() => setShowModal(false)}
          reload={loadElections}
        />
      )}

    </div>
  );
};

export default AdminDashboard;