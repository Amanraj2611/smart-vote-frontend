import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png"; // ✅ your image

import "../styles/admin.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>

      {/* 🔥 TOPBAR */}
      <div className="topbar">

        {/* LEFT */}
        <div className="topbar-left">

          {/* ✅ LOGO IMAGE */}
          <div className="admin-sign">
            <img src={logo} alt="VoteSys Logo" className="logo-img" />
            <span className="logo-text">VoteFlow</span>
          </div>

          {/* BACK BUTTON */}
          {location.pathname !== "/admin" && (
            <button
              className="nav-back-btn"
              onClick={() => navigate("/admin")}
            >
              <FaArrowLeft />
              Back to Dashboard
            </button>
          )}

        </div>

        {/* RIGHT */}
        <div className="admin-info">

          <span className="admin-label">Admin</span>

          <button className="logout-btn" onClick={logout}>
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

      {/* PAGE */}
      <div className="page-container">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;