import React from "react";
import { withRouter } from "react-router";
import Card from "../Card/Card";
import "./DashBoardItem.css";

function DashBoardItem({ title, history, data, titleId }) {
  const onClick = (ids, mallId) => {
    console.log(ids, mallId);
    history.push(`/admin/shop-detail/${titleId || mallId}/${ids}`);
  };

  const onClickMallDetail = (mallId) => {
    history.push(`/admin/mall-detail/${mallId}`);
  };
  return (
    <div className="dashboard-item-container">
      <h3>{title}</h3>
      <div className="item-image-container">
        {title === "Shops" &&
          data?.map(({ id, shopName, shopsImages, mallId }) => (
            <Card
              key={id}
              onClickDetail={onClick}
              heading={shopName}
              image={shopsImages[0]?.url}
              id={id}
              mallId={mallId}
            />
          ))}
        {title === "Malls" &&
          data?.map((mall) => (
            <Card
              key={mall.id}
              heading={mall.mallName}
              subHeading={mall.mallAddress}
              image={mall.mallImage.imageUrl}
              id={mall.id}
              onClickDetail={() => onClickMallDetail(mall.id)}
            />
          ))}
      </div>
    </div>
  );
}

export default withRouter(DashBoardItem);
