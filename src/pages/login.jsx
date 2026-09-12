import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/admin/login", {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          <img src="/logo.webp" alt="Zyveniq Logo" />
        </div>

        <h1>Admin Login</h1>

        <p className="login-subtitle">
          Internship Certificate Verification System
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}