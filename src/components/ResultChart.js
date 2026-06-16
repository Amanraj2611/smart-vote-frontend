import { useEffect, useState } from "react";
import API from "../api/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultChart = ({ electionId }) => {

  const [results, setResults] = useState([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    const res = await API.get(`/election/result/${electionId}`);
    setResults(res.data);
  };

  const data = {
    labels: results.map(r => r.candidateName),
    datasets: [
      {
        label: "Votes",
        data: results.map(r => r.voteCount),
        backgroundColor: "#3b82f6"
      }
    ]
  };

  return (
    <div style={{marginTop:"30px"}}>
      <h3>Election Results</h3>
      <Bar data={data}/>
    </div>
  );
};

export default ResultChart;