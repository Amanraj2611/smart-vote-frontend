import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Register = () => {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate = useNavigate();

  const register = async () => {

    try{

      await API.post("/auth/register",{
        name,
        email,
        password,
        role:"VOTER"
      });

      alert("Account created successfully");

      navigate("/");

    }catch(err){

      alert("User already exists");

    }

  };

  return (

    <div className="login-page">

      {/* LEFT SIDE */}

      <div className="left-panel">

        <h1>
          Secure,<br/>
          Transparent Voting<br/>
          for Modern Communities
        </h1>

        <p>
          Empower your organization with a trustworthy digital voting platform.
          Fair elections, real-time results, zero hassle.
        </p>

        <div className="features">

          <div>
            🔒 <h4>Secure</h4>
            <p>One vote per voter, authenticated access</p>
          </div>

          <div>
            👥 <h4>Simple</h4>
            <p>Intuitive interface for all users</p>
          </div>

          <div>
            ⚡ <h4>Real-time</h4>
            <p>Live results and analytics</p>
          </div>

        </div>

      </div>

      {/* RIGHT CARD */}

      <div className="login-card">

        <h2>Get Started</h2>
        <p>Create your account</p>

        <input
          placeholder="Full Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email Address"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={register}>
          Create Account
        </button>

        <p className="signup-text">
          Already have an account?
          <Link to="/"> Sign in</Link>
        </p>

      </div>

    </div>

  );

};

export default Register;