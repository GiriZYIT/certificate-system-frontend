import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../services/api";
import "../styles/layout.css";
import "../styles/table.css";
import { toast } from "react-toastify";
import { useNotification } from "../context/NotificationContext";

export default function InternList() {
  const [interns, setInterns] = useState([]);
  const [search, setSearch] = useState("");

  const { addNotification } = useNotification();

  const loadInterns = async () => {
    try {
      const response = await api.get("/interns");
      setInterns(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load interns.");
    }
  };

  useEffect(() => {
    loadInterns();
  }, []);

  const handleDelete = async (certificate_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/intern/${certificate_id}`);

      toast.success("Certificate Deleted Successfully");
      addNotification("Certificate deleted.");

      loadInterns();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete certificate.");
    }
  };

  const filteredInterns = interns.filter((intern) => {
    const searchText = search.toLowerCase();

    return (
      intern.intern_name?.toLowerCase().includes(searchText) ||
      intern.intern_id?.toLowerCase().includes(searchText) ||
      intern.certificate_id?.toLowerCase().includes(searchText) ||
      intern.role?.toLowerCase().includes(searchText) ||
      intern.department?.toLowerCase().includes(searchText)
    );
  });

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="content">
        <div className="page-header">
          <div>
            <h1>Internships</h1>
            <p>Manage internship certificates</p>
          </div>

          <Link to="/add" className="add-button">
            + Create Certificate
          </Link>
        </div>

        <div className="table-card">

          <div className="table-header">
            <h2>Certificate Records</h2>

            <input
              type="text"
              placeholder="Search certificates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Intern Name</th>
                  <th>Intern ID</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Duration</th>
                  <th>Certificate ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredInterns.length > 0 ? (
                  filteredInterns.map((intern) => (
                    <tr key={intern.certificate_id}>

                      <td>
                        {intern.intern_name}
                      </td>

                      <td>
                        {intern.intern_id}
                      </td>

                      <td>
                        {intern.role}
                      </td>

                      <td>
                        {intern.department}
                      </td>

                      <td>
                        {intern.duration}
                      </td>

                      <td>
                        {intern.certificate_id}
                      </td>

                      <td>
                        <span className="status verified">
                          ✓ VERIFIED
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">

                          <Link
                            to={`/edit/${intern.certificate_id}`}
                            className="edit-btn"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(
                                intern.certificate_id
                              )
                            }
                            className="delete-btn"
                          >
                            Delete
                          </button>

                          <a
                            href={`https://certificate-system-frontend.vercel.app/verify/${intern.certificate_id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="verify-btn"
                          >
                            Verify
                          </a>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No certificates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}