import { useState } from "react";
import "../styles/topbar.css";
import { useNotification } from "../context/NotificationContext";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  /* const { notifications } = useNotification();*/
  const notifications = [];
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="topbar-right">

        <div
          className="notification"
          onClick={() => setOpen(!open)}
        >
          🔔

          <span className="badge">
            {notifications.length}
          </span>

          {open && (
            <div className="notification-dropdown">

              <h4>Notifications</h4>

              {notifications.length === 0 ? (
                <p className="empty">
                  No notifications
                </p>
              ) : (
               notifications.map((item) => (
                        <div className="notification-item" key={item.id}>
                            <strong>{item.message}</strong>
                            <br />
                            <small>{item.time}</small>
                        </div>
                    ))
              )}

            </div>
          )}

        </div>

        <div className="profile">
          <div className="avatar">
            AD
          </div>

          <div className="admin-details">
            <h4>Admin</h4>
            <p>Zyveniq</p>
          </div>
        </div>

      </div>
    </div>
  );
}