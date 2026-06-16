import { useState } from "react";
import API from "../../api/api";

const CreateElection = () => {

  const [title,setTitle] = useState("");

  const createElection = async () => {

    await API.post("/api/admin/create-election",{
      title
    });

    alert("Election Created");
  };

  return (
    <div className="container mt-4">

      <h3>Create Election</h3>

      <input
        className="form-control mb-3"
        placeholder="Election Title"
        onChange={(e)=>setTitle(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={createElection}
      >
        Create
      </button>

    </div>
  );
};

export default CreateElection;