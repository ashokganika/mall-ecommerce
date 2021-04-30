import React from "react";
import { useHistory } from "react-router";
import "./adminNavbar.css";

function AdminNavbar() {
  const { push } = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    push("/");
  };
  return (
    <div className="navbar">
      <div className="logo">
        <i className="fas fa-user"></i>
      </div>
      <div className="nav-item">
        <div className="item" onClick={handleLogout}>
          Logout
        </div>
        <div className="item" onClick={() => push("/")}>
          Switch To User
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
