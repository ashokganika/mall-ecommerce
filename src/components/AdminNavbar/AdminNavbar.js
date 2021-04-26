import React from "react";
import "./adminNavbar.css";

function AdminNavbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <i className="fas fa-user"></i>
      </div>
      <div className="nav-item">
        <div className="item">Logout</div>
        <div className="item">Switch To User</div>
      </div>
    </div>
  );
}

export default AdminNavbar;
