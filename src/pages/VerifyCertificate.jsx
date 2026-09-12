import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/verify.css";

export default function VerifyCertificate() {
  const { certificate_id } = useParams();

  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const response = await api.get(`/intern/${certificate_id}`);
        setIntern(response.data);
      } catch (err) {
        console.error(err);
        setError("Certificate not found or invalid.");
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [certificate_id]);

  if (loading) {
    return (
      <div className="verify-loading">
        <div className="loader"></div>
        <p>Verifying certificate...</p>
      </div>
    );
  }

  if (error || !intern) {
    return (
      <div className="verify-page">
        <header className="verify-header">
          <div className="verify-logo">
            <strong>ZYVENIQ</strong>
            <span>wear the moment</span>
          </div>
        </header>

        <main className="invalid-certificate">
          <div className="invalid-icon">✕</div>

          <h1>INVALID CERTIFICATE</h1>

          <p>
            This certificate could not be found or verified.
          </p>

          <div className="certificate-id">
            Certificate ID: {certificate_id}
          </div>
        </main>

        <footer>
          © 2026 Zyveniq Private Limited. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="verify-page">

      {/* HEADER */}
      <header className="verify-header">
        <div className="verify-logo">
          <strong>ZYVENIQ</strong>
          <span>wear the moment</span>
        </div>
      </header>

      {/* MAIN VERIFICATION AREA */}
      <main className="verification-container">

        {/* LEFT SIDE */}
        <section className="verification-left">

          <h1>Certificate Verification</h1>

          <p className="verification-subtitle">
            Verify the authenticity of your certificate
          </p>

          <div className="verified-icon">
            ✓
          </div>

          <h2>
            CERTIFICATE VERIFIED
          </h2>

          <p className="verified-description">
            This certificate is valid and has been officially issued by
            Zyveniq Private Limited.
          </p>

          <div className="security-box">

            <div className="security-icon">
              ✓
            </div>

            <div>
              <strong>
                This certificate is digitally signed and secure.
              </strong>

              <p>
                Data on this certificate has not been tampered.
              </p>
            </div>

          </div>

        </section>


        {/* CERTIFICATE DETAILS */}
        <section className="certificate-card">

          <div className="certificate-card-header">

            <span>
              INTERNSHIP CERTIFICATE
            </span>

            <span className="verified-badge">
              VERIFIED
            </span>

          </div>


          <div className="certificate-details">

            {/* INTERN NAME */}
            <div className="detail-item">
              <span>Intern Name</span>
              <strong>
                {intern.intern_name}
              </strong>
            </div>


            {/* ROLE */}
            <div className="detail-item">
              <span>Role</span>
              <strong>
                {intern.role}
              </strong>
            </div>


            {/* DEPARTMENT */}
            <div className="detail-item">
              <span>Department</span>
              <strong>
                {intern.department}
              </strong>
            </div>


            {/* START DATE */}
            <div className="detail-item">
              <span>Internship Start Date</span>
              <strong>
                {intern.start_date}
              </strong>
            </div>


            {/* END DATE */}
            <div className="detail-item">
              <span>Internship End Date</span>
              <strong>
                {intern.end_date}
              </strong>
            </div>


            {/* DURATION */}
            <div className="detail-item">
              <span>Internship Duration</span>
              <strong>
                {intern.duration}
              </strong>
            </div>


            {/* CERTIFICATE ID */}
            <div className="detail-item">
              <span>Certificate ID</span>
              <strong>
                {intern.certificate_id}
              </strong>
            </div>


            {/* ISSUE DATE = END DATE */}
            <div className="detail-item">
              <span>Issue Date</span>
              <strong>
                {intern.end_date}
              </strong>
            </div>


            {/* STATUS */}
            <div className="detail-item status-detail">
              <span>Status</span>
              <strong>
                ✓ VERIFIED
              </strong>
            </div>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer>
        © 2026 Zyveniq Private Limited. All rights reserved.
      </footer>

    </div>
  );
}