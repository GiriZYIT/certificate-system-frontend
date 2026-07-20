import { useEffect, useState } from "react";
import "../styles/layout.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import QuickAction from "../components/QuickAction";

import api from "../services/api";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

useEffect(() => {
    loadDashboard();
}, []);

const loadDashboard = async () => {
    try {
        setLoading(true);
        const res = await api.get("/interns");
        setInterns(res.data);
        setError("");
    } catch (err) {
        console.error(err);
        setError("Unable to load dashboard.");
    } finally {
        setLoading(false);
    }
};

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="content dashboard">

        <div className="welcome-card">

          <div>
            <h1>Welcome Back 👋</h1>

            <p>
              Manage internship certificates, interns and QR verification
              from one secure dashboard.
            </p>
          </div>

        </div>

        <div className="stats-grid">

          <StatCard
              title="Total Interns"
              value={interns.length}
              icon="👨‍🎓"
              color="#072F5F"
          />

          <StatCard
              title="Certificates"
              value={interns.length}
              icon="📜"
              color="#C9A84F"
          />

          <StatCard
              title="QR Generated"
              value={interns.length}
              icon="🔳"
              color="#2E8B57"
          />

          <StatCard
              title="Verified"
              value={interns.length}
              icon="✅"
              color="#E67E22"
          />

        </div>

        <h2 className="section-title">
          Quick Actions
        </h2>

        <div className="quick-grid">

          <QuickAction
            title="Create Certificate"
            subtitle="Generate a new internship certificate."
            icon="➕"
            link="/add"
          />

          <QuickAction
            title="Intern List"
            subtitle="View all generated certificates."
            icon="📋"
            link="/interns"
          />

        </div>

        <h2 className="section-title">
          Recent Certificates
        </h2>

        <div className="table-card">
          {loading && <p>Loading dashboard...</p>}
          {error && <p className="error">{error}</p>}

          <table>

            <thead>

              <tr>

                <th>Certificate ID</th>

                <th>Name</th>

                <th>Department</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>
                  {interns.length === 0 ? (
                      <tr>
                          <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                              No certificates found.
                          </td>
                      </tr>
                  ) : (
                      interns.slice(0, 5).map((intern) => (
                          <tr key={intern.certificate_id}>
                              <td>{intern.certificate_id}</td>
                              <td>{intern.intern_name}</td>
                              <td>{intern.department}</td>
                              <td>
                                  <span className={`status ${intern.status.toLowerCase()}`}>
                                      {intern.status}
                                  </span>
                              </td>
                          </tr>
                      ))
                  )}
            </tbody>
          </table>

        </div>

      </div>
    </>
  );
}