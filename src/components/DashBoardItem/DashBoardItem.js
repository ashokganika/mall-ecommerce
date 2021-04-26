import React from "react";
import { withRouter } from "react-router";
import Card from "../Card/Card";
import "./DashBoardItem.css";

function DashBoardItem({ title, history }) {
  const onClick = () => {
    history.push("/mall-detail/hjdfgh");
  };
  return (
    <div className="dashboard-item-container">
      <h3>{title}</h3>
      <div className="item-image-container">
        <Card onClickDetail={onClick} />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default withRouter(DashBoardItem);
