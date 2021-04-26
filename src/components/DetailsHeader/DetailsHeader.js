import React from "react";
import "./detailsHedaer.css";

function DetailsHeader({ title, subtitle }) {
  return (
    <div className="details-header">
      <h2>{title}</h2>
      <h4>{subtitle}</h4>
    </div>
  );
}

export default DetailsHeader;
