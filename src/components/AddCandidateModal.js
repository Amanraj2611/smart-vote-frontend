import { useState } from "react";
import API from "../api/api";
import "../styles/modal.css";
import toast from "react-hot-toast";
const AddCandidateModal = ({ electionId, close, reload }) => {

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");

  const addCandidate = async ()=>{

  if(!name){
    toast.error("Enter candidate name");
    return;
  }

  try{

    await API.post("/candidate/add",{
      name: name,
      description: description,
      election: {
        id: electionId
      }
    });

    toast.success("Candidate Added ✅");

    reload();
    close();

  }catch(err){

    toast.error("Failed to add candidate ❌");

  }

};

  return(

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>Add New Candidate</h2>

        <input
        placeholder="Candidate name"
        onChange={(e)=>setName(e.target.value)}
        />

        <textarea
        placeholder="Candidate description"
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
          onClick={addCandidate}
          >
            Add Candidate
          </button>

        </div>

      </div>

    </div>

  );

};

export default AddCandidateModal;