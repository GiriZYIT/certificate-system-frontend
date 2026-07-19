import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNotification } from "../context/NotificationContext";
import { toast } from "react-toastify";

import "../styles/table.css";

export default function InternList() {

    const [interns, setInterns] = useState([]);

    useEffect(() => {

        loadInterns();

    }, []);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const loadInterns = async () => {

        try {

            const res = await api.get("/interns");

            setInterns(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <>

            <Sidebar />

            <Topbar />

            <div className="table-page">

                <div className="table-wrapper">

                    <h1>Intern Certificates</h1>

                    <p>
                        All generated internship certificates.
                    </p>
                      <input
                          type="text"
                          placeholder="Search Intern..."
                          value={search}
                          onChange={(e)=>setSearch(e.target.value)}
                      />
                    <table>

                        <thead>

                            <tr>

                                <th>Certificate ID</th>

                                <th>Name</th>

                                <th>Department</th>

                                <th>Role</th>

                                <th>Duration</th>

                                <th>QR</th>

                                <th>Edit</th>

                                <th>Delete</th>

                            </tr>

                        </thead>

                        <tbody>
                          {interns
                              .filter((intern) =>
                                  (intern.intern_name || "")
                                      .toLowerCase()
                                      .includes(search.toLowerCase())
                              )
                              .map((intern) => (

                                  <tr key={intern.certificate_id}>

                                      <td>{intern.certificate_id}</td>

                                      <td>{intern.intern_name}</td>

                                      <td>{intern.department}</td>
 
                                      <td>{intern.role}</td>
 
                                      <td>{intern.duration}</td>

                                      <td>
                                          <a
                                              href={`${import.meta.env.VITE_API_URL}/verify/${intern.certificate_id}`}
                                              target="_blank"
                                              rel="noreferrer"
                                          >
                                              Verify
                                          </a>
                                      </td>

                                      <td>
                                        <button
                                                  className="edit-btn"
                                                  onClick={() =>
                                                      navigate(`/edit/${intern.certificate_id}`)
                                                  }
                                              >
                                                  Edit
                                        </button>
                                      </td>

                                      <td>
                                          <button
                                                className="delete-btn"
                                                onClick={async () => {

                                                    if (
                                                        !window.confirm(
                                                            "Delete this certificate?"
                                                        )
                                                    )
                                                        return;

                                                    try {
                                                          await api.delete(`/intern/${intern.certificate_id}`);

                                                          toast.success("Certificate deleted successfully!");

                                                          addNotification(
                                                              `Certificate ${intern.certificate_id} deleted`
                                                          );

                                                          loadInterns();

                                                      } catch (err) {

                                                          toast.error("Failed to delete certificate.");

                                                          console.error(err);

                                                      }
                                                }}
                                            >
                                                Delete
                                          </button>
                                         
                                      </td>
                                                  
                                  </tr>

                          ))}
                          
                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}