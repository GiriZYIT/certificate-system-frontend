import { NavLink } from "react-router-dom";
import logo from "../assets/logo.webp";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-top">

        <img src={logo} alt="Zyveniq" className="sidebar-logo" />

        <h1>ZYVENIQ</h1>

        <p>Wear the Moment</p>

      </div>

      <div className="sidebar-menu">

        <NavLink to="/" className="menu-item">
          <span>🏠</span>
          Dashboard
        </NavLink>

        <NavLink to="/add" className="menu-item">
          <span>➕</span>
          Create Certificate
        </NavLink>

        <NavLink to="/interns" className="menu-item">
          <span>📋</span>
          Intern List
        </NavLink>

      </div>

      <div className="sidebar-bottom">

        <button className="logout-btn">

          🚪 Logout

        </button>

      </div>

    </div>
  );
}