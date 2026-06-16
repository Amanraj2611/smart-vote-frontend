import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/voter.css";

const VoterDashboard = () => {

  const [elections, setElections] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "VOTER") {
      window.location.href = "/";
      return;
    }

    // 👉 Fake user (replace later with backend)
    // setUser({
    //   name: "voter1",
    //   email: "voter1@gmail.com"
    // });

    loadElections();

  }, []);

  const loadElections = async () => {

    try {

      const res = await API.get("/election/all");

      const openElections = res.data.filter(
        (e) => e.status === "OPEN"
      );

      setElections(openElections);

    } catch (err) {
      console.log(err);
    }

  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (

    <div className="voter-page">

      {/* 🔥 NAVBAR */}
      <div className="voter-navbar">

        <h2 className="logo">✔ CastVote</h2>

        <div className="user-info">

          <div>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </div>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
          <span className="role-badge">✔ Voter</span>
      
        </div>

      </div>

      {/* 🔥 CONTENT */}
      <div className="voter-container">

        <h1>Welcome,Voter {user.name}!</h1>
        <p className="subtitle">
          Cast your vote in active elections below.
        </p>

        {/* 🔥 STATS */}
        <div className="stats-grid">

          <div className="stat-card">
            <p>Active Elections</p>
            <h2>{elections.length}</h2>
          </div>

          <div className="stat-card">
            <p>My Votes Cast</p>
            <h2>0</h2>
          </div>

          <div className="stat-card">
            <p>Total Elections</p>
            <h2>{elections.length}</h2>
          </div>

        </div>

        <h2 className="section-title">Active Elections</h2>

        {/* 🔥 ELECTION CARDS */}
        <div className="election-grid">

          {elections.map((e) => (

            <div key={e.id} className="election-card">

              <h3>{e.title}</h3>

              <span className="badge">Active</span>

              <p>{e.description}</p>

              <button
                className="vote-btn"
                onClick={() => navigate(`/vote/${e.id}`)}
              >
                Cast Your Vote
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default VoterDashboard;