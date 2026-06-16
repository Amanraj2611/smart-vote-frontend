import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

/* AUTH */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* ADMIN */
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminElections from "./pages/admin/AdminElections";
import ManageElection from "./pages/admin/ManageElection";

/* VOTER */
import Elections from "./pages/Elections";
import Results from "./pages/voter/Results";
import VoterDashboard from "./pages/voter/VoterDashboard";
import Vote from "./pages/voter/Vote";

function App() {
  return (
    <BrowserRouter>

      {/* 🔥 GLOBAL TOAST */}
      <Toaster position="top-right" />

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="elections" element={<AdminElections />} />
          <Route path="manage/:id" element={<ManageElection />} />
          <Route path="results/:id" element={<Results />} />
        </Route>

        <Route path="/voter" element={<VoterDashboard />} />
        <Route path="/vote/:id" element={<Vote />} />
        <Route path="/elections" element={<Elections />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;