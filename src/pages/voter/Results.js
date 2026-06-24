import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import "../../styles/admin.css";

const Results = () => {

  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchResults = async () => {

      try {

        const res = await API.get(`/election/result/${id}`);

        // 🔥 Fix field names from backend
        const fixedData = res.data.map(item => ({
          candidateId: item.candidateId || item.candidateid,
          candidateName: item.candidateName || item.candidatename,
          voteCount: Number(item.voteCount || item.votecount || 0)
        }));

        setResults(fixedData);

      } catch (err) {

        console.error("RESULT ERROR:", err);
        alert("Cannot load result");

      } finally {

        setLoading(false);

      }
    };

    fetchResults();

  }, [id]);

  // 🔥 Sort by votes
  const sorted = [...results].sort(
    (a, b) => b.voteCount - a.voteCount
  );

  const totalVotes = sorted.reduce(
    (sum, r) => sum + r.voteCount,
    0
  );

  const leader = sorted[0];

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading Results...</h2>;
  }

  return (

    <div className="page-container">

      <h1>Election Results</h1>

      {leader && (
        <div className="leader-card">

          <h4>🏆 Leading Candidate</h4>
          <h2>{leader.candidateName}</h2>

          <div className="leader-stats">

            <div>
              <h3>{leader.voteCount}</h3>
              <span>votes</span>
            </div>

            <div>
              <h3>
                {totalVotes === 0
                  ? 0
                  : Math.round((leader.voteCount / totalVotes) * 100)}
                %
              </h3>
              <span>of total</span>
            </div>

          </div>

        </div>
      )}

      <h3 style={{ marginTop: "30px" }}>Detailed Results</h3>

      {sorted.map((r, index) => {

        const percent =
          totalVotes === 0
            ? 0
            : Math.round((r.voteCount / totalVotes) * 100);

        return (

          <div key={r.candidateId} className="candidate-card">

            <div className="candidate-left">

              <div className="rank">#{index + 1}</div>

              <div>
                <h4>{r.candidateName}</h4>
              </div>

            </div>

            <div className="candidate-right">

              <p>{r.voteCount} votes</p>
              <strong>{percent}%</strong>

            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percent}%` }}
              ></div>
            </div>

          </div>

        );

      })}

      <div className="stats-grid" style={{ marginTop: "30px" }}>

        <div className="stat-card">
          <p>Total Votes</p>
          <h2>{totalVotes}</h2>
        </div>

        <div className="stat-card">
          <p>Total Candidates</p>
          <h2>{results.length}</h2>
        </div>

        <div className="stat-card">
          <p>Avg Votes/Candidate</p>
          <h2>
            {results.length === 0
              ? 0
              : Math.round(totalVotes / results.length)}
          </h2>
        </div>

      </div>

    </div>
  );
};

export default Results;