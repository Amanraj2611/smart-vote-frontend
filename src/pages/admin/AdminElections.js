import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCog, FaChartBar } from "react-icons/fa";
import API from "../../api/api";
import "../../styles/admin.css";

const AdminElections = () => {

  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      const res = await API.get("/election/all");
      setElections(res.data);
    } catch {
      alert("Cannot load elections");
    }
  };

  return (
    <div className="page-container">

      <h2>All Elections</h2>

      <div className="table-card">

        <table>

          <thead>
            <tr>
              <th>Election</th>
              <th>Status</th>
              <th>Votes</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {elections.map((e) => (

              <tr key={e.id}>

                <td>
                  <strong>{e.title}</strong>
                  <p className="desc">{e.description}</p>
                </td>

                <td>
                  <span className={`status ${e.status.toLowerCase()}`}>
                    {e.status}
                  </span>
                </td>

                <td>{e.totalVotes || 0}</td>

                <td>

                  <button
                    className="manage-btn"
                    onClick={() => navigate(`/admin/manage/${e.id}`)}
                  >
                    <FaCog />
                    Manage
                  </button>

                  <button
                    className="results-btn"
                    onClick={() => navigate(`/admin/results/${e.id}`)}
                  >
                    <FaChartBar />
                    Results
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminElections;