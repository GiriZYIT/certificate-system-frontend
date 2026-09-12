import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../services/api";
import "../styles/form.css";
import { toast } from "react-toastify";
import { useNotification } from "../context/NotificationContext";
import "../styles/layout.css";

export default function AddIntern() {
  const [formData, setFormData] = useState({
    intern_name: "",
    intern_id: "",
    role: "",
    department: "",
    start_date: "",
    end_date: "",
    duration: "",
  });

  const { certificate_id } = useParams();
  const { addNotification } = useNotification();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (certificate_id) {
        await api.put(`/intern/${certificate_id}`, formData);

        toast.success("Intern Updated Successfully");
        addNotification("Intern details updated.");
      } else {
        await api.post("/intern", formData);

        toast.success("Certificate Created Successfully");
        addNotification("Certificate created successfully.");
      }

      setFormData({
        intern_name: "",
        intern_id: "",
        role: "",
        department: "",
        start_date: "",
        end_date: "",
        duration: "",
      });
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.detail ||
          "Failed to save certificate."
      );
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="content form-page">
        <div className="form-card">

          <h1>
            {certificate_id
              ? "Edit Internship"
              : "Create Internship Certificate"}
          </h1>

          <p>
            Fill in the intern details to generate a certificate.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Intern Name */}
            <input
              type="text"
              name="intern_name"
              placeholder="Intern Name"
              value={formData.intern_name}
              onChange={handleChange}
              required
            />

            {/* Intern ID */}
            <input
              type="text"
              name="intern_id"
              placeholder="Intern ID"
              value={formData.intern_id}
              onChange={handleChange}
              required
            />

            {/* Role */}
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              required
            />

            {/* Department */}
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />

            {/* Start Date */}
            <div className="date-group">
              <label htmlFor="start_date">
                Start Date
              </label>

              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* End Date */}
            <div className="date-group">
              <label htmlFor="end_date">
                End Date
              </label>

              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Duration */}
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />

            {/* Status */}
            <div className="status-box">
              <label>
                Certificate Status
              </label>

              <div className="verified-status">
                ✓ VERIFIED
              </div>
            </div>

            {/* Submit */}
            <button type="submit">
              {certificate_id
                ? "Update Intern"
                : "Create Certificate"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}