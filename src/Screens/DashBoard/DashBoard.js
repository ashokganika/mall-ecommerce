import React from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import Button from "../../components/Button/Button";
import DashBoardItem from "../../components/DashBoardItem/DashBoardItem";
import "./dashboard.css";

function DashBoard({ history }) {
  return (
    <>
      <AdminNavbar />
      <div className="dashboard-container">
        <Button
          text="Add New Mall"
          onClick={() => history.push("/add-mall")}
          type="button"
        />
        <DashBoardItem title="Malls" />
        <div
          className="view-all"
          onClick={() => history.push("/admin-all-malls")}
        >
          <span>View All</span>
        </div>
        <DashBoardItem title="Shops" />
        <div className="view-all">
          <span>View All</span>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
