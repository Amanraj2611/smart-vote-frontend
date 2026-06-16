import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import toast from "react-hot-toast";

const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate = useNavigate();

  const login = async () => {

  try{

    const res = await API.post("/auth/login",{email,password});

    localStorage.setItem("token",res.data.token);
    localStorage.setItem("role",res.data.role);

    // 🔥 POPUP
    toast.success("Welcome back!");

    if(res.data.role==="ADMIN"){
      navigate("/admin");
    }else{
      navigate("/voter");
    }

  }catch(err){

    toast.error("Invalid Credentials");

  }

};

  return (

    <div className="login-page">

      <div className="left-panel">

        <h1>
          Secure,<br/>
          Transparent Voting<br/>
          for Modern Communities
        </h1>

        <p>
          Empower your organization with a trustworthy digital voting
          platform. Fair elections, real-time results, zero hassle.
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

      <div className="login-card">

        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>

        <input
          placeholder="Email Address"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={login}>Sign In</button>

        <p className="signup-text">
          Don't have an account?
          <Link to="/register"> Sign up</Link>
        </p>

      </div>

    </div>

  );

};

export default Login;