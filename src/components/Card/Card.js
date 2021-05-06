import React from "react";
import { useRouteMatch } from "react-router";
import Admin from "../../utility/isAdmin";
import "./card.css";

function Card({
  onClickDetail,
  image,
  heading,
  subHeading,
  id,
  mallId,
  handleRemoveCard,
}) {
  const route = useRouteMatch();
  const isAdmin = Admin(route.url);

  return (
    <div
      className="img-container"
      onClick={() => onClickDetail && onClickDetail(id, mallId)}
    >
      <div className="img">
        <img src={image} alt={heading} />
      </div>
      {isAdmin && (
        <p className="exit" onClick={handleRemoveCard && handleRemoveCard}>
          X
        </p>
      )}
      <div className="content">
        <p>{heading}</p>
        <p>{subHeading}</p>
      </div>
    </div>
  );
}

export default Card;
