import React from "react";
import "./card.css";

function Card({ onClickDetail, image, heading, subHeading }) {
  const handleRemoveCard = (e) => {
    console.log("removed");
    e.stopPropagation();
  };
  return (
    <div className="img-container" onClick={onClickDetail}>
      <div className="img">
        <img src={image} alt={heading} />
      </div>
      <p className="exit" onClick={handleRemoveCard}>
        X
      </p>
      <div className="content">
        <p>{heading}</p>
        <p>{subHeading}</p>
      </div>
    </div>
  );
}

export default Card;
