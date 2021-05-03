import React from "react";
import { withRouter } from "react-router";
import Card from "../Card/Card";
import notification from "../../utility/notification";
import allImagesFromMall from "../../utility/allImagesFromMall";

import "./DashBoardItem.css";

function DashBoardItem({ title, history, data, titleId }) {
  const onClick = (ids, mallId) => {
    console.log(ids, mallId);
    history.push(`/admin/shop-detail/${titleId || mallId}/${ids}`);
  };

  const onClickMallDetail = (mallId) => {
    history.push(`/admin/mall-detail/${mallId}`);
  };

  const handleRemoveCard = (e, mallId) => {
    const mallTobeDeleted = data.find((mall) => mall.id === mallId);
    deleteMall(mallId)
      .then((res) => {
        const allImg = allImagesFromMall(mallTobeDeleted);
        removeMallImages(allImg);
        notification.showSuccess("sucessfully deleted");
        // setMalls([...malls.filter((mall) => mall.id !== mallId)]);
        // setFilterMalls([...malls.filter((mall) => mall.id !== mallId)]);
      })
      .catch((err) => notification.showError("could not delete try again"));
    e.stopPropagation();
  };
  return (
    <div className="dashboard-item-container">
      <h3>{title}</h3>
      <div className="item-image-container">
        {title === "Shops" &&
          data?.map(({ id, shopName, shopsImages, mallId } = {}) => (
            <Card
              key={id}
              onClickDetail={onClick}
              heading={shopName}
              image={shopsImages && shopsImages[0]?.url}
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
              handleRemoveCard={(e) => handleRemoveCard(e, mall.id)}
            />
          ))}
      </div>
    </div>
  );
}

export default withRouter(DashBoardItem);
