import { useState } from "react";
import API from "../api/api";
import "../styles/modal.css";

const CreateElectionModal = ({ close, reload }) => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const createElection = async () => {

    if(!title){
      alert("Please enter election title");
      return;
    }

    try{

      await API.post("/election/create",{
        title:title,
        description:description
      });

      reload();
      close();

    }catch(err){

      console.log(err);

    }

  };

  return(

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>Create New Election</h2>

        <p>
          Set up a new election. You can add candidates and manage settings after creation.
        </p>

        <input
          placeholder="e.g., Student Council Election 2026"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          placeholder="Describe the purpose of this election..."
          onChange={(e)=>setDescription(e.target.value)}
        />

        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={close}
          >
            Cancel
          </button>

          <button
            className="create-btn"
            onClick={createElection}
          >
            Create Election
          </button>

        </div>

      </div>

    </div>

  );

};

export default CreateElectionModal;