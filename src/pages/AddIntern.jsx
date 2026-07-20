import { useState, useEffect } from "react";
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
    email: "",
    role: "",
    department: "",
    start_date: "",
    end_date: "",
    duration: "",
    photo: null,
    certificate_pdf: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.files[0],
  });
};

  const { certificate_id } = useParams();
  const { addNotification } = useNotification();
/*
  useEffect(() => {

    if (certificate_id) {

        loadIntern();

    }

  }, [certificate_id]);

  const loadIntern = async () => {

    const res = await api.get(
        `/intern/${certificate_id}`
    );

    setFormData({
        intern_name: res.data.intern_name,
        intern_id: res.data.intern_id,
        email: res.data.email,
        role: res.data.role,
        department: res.data.department,
        start_date: res.data.start_date,
        end_date: res.data.end_date,
        duration: res.data.duration
    });

  };
*/
  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
      if (certificate_id) {

          await api.put(
              `/intern/${certificate_id}`,
              formData
          );

          toast.success("Intern Updated Successfully");

            addNotification(
                "Intern details updated."
            );

      }
      else {

          const data = new FormData();

              Object.keys(formData).forEach((key) => {
                  data.append(key, formData[key]);
              });

              await api.post("/intern", data, {
                  headers: {
                      "Content-Type": "multipart/form-data",
                  },
          });

          toast.success("Certificate Created Successfully");

          addNotification(
              "Certificate created successfully."
          );

      }

     
      setFormData({
        intern_name: "",
        intern_id: "",
        email: "",
        role: "",
        department: "",
        start_date: "",
        end_date: "",
        duration: "",
      });
      } catch (err) {
        console.error(err);
        toast.error("Failed to create certificate.");
      }
 };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="content form-page">

        <div className="form-card">

          <h1>{certificate_id
                ? "Edit Internship"
                : "Create Internship Certificate"}
          </h1>

          <p>
            Fill in the intern details to generate a certificate.
          </p>

         <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="intern_name"
              placeholder="Intern Name"
              value={formData.intern_name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="intern_id"
              placeholder="Intern ID"
              value={formData.intern_id}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />

            <label>Upload Intern Photo</label>

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              required
            />

            <label>Upload Certificate PDF</label>

            <input
              type="file"
              name="certificate_pdf"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />

            <button type="submit">
              {certificate_id ? "Update Intern" : "Generate Certificate"}
            </button>

          </form>

        </div>

      </div>
    </>
  );
}