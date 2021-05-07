import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { withRouter } from "react-router";
import Card from "../Card/Card";
import notification from "../../utility/notification";
import allImagesFromMall from "../../utility/allImagesFromMall";
import {
  deleteMall,
  deleteShopFromMall,
} from "../../services/firebaseDatabaseService";
import {
  removeMallImages,
  removeShopImagefromMallShop,
} from "../../services/firebaseStoreService";
import "./DashBoardItem.css";

function DashBoardItem({ title, history, data, titleId, role }) {
  const allMallsFromStore = useSelector(
    (state) => state.allMallsReducer,
    shallowEqual
  );

  const onClick = (ids, mallId) => {
    role === "admin"
      ? history.push(`/admin/shop-detail/${titleId || mallId}/${ids}`)
      : history.push(`/shop-detail/${titleId || mallId}/${ids}`);
  };

  const onClickMallDetail = (mallId) => {
    role === "admin"
      ? history.push(`/admin/mall-detail/${mallId}`)
      : history.push(`/mall-detail/${mallId}`);
  };

  const handleRemoveCard = (e, mallId) => {
    const mallTobeDeleted = data.find((mall) => mall.id === mallId);
    deleteMall(mallId)
      .then((res) => {
        const allImg = allImagesFromMall(mallTobeDeleted);
        removeMallImages(allImg);
        notification.showSuccess("sucessfully deleted");
      })
      .catch((err) => notification.showError("could not delete try again"));
    e.stopPropagation();
  };

  const handleRemoveCardShop = (e, shopId, mallId) => {
    const mallIdentity = mallId || titleId;
    const mall = allMallsFromStore.malls.find(
      (item) => item.id === mallIdentity
    );
    console.log("object", mall, mallIdentity, shopId);
    const shopToBeDeleted = mall.shops.find((shop) => shop.id === shopId);
    const allImagesFromShop = shopToBeDeleted.shopsImages.map(
      (item) => item.urlName
    );
    const newShop = mall.shops.filter((shop) => shop.id !== shopId);

    deleteShopFromMall(mallIdentity, newShop)
      .then((res) => {
        removeShopImagefromMallShop(allImagesFromShop);
        notification.showSuccess("deleted shop sucessfully");
      })
      .catch((err) => notification.showWarning("could not deletd shop"));
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
              handleRemoveCard={(e) => handleRemoveCardShop(e, id, mallId)}
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

DashBoardItem.defaultProps = {
  role: "user",
};

export default withRouter(DashBoardItem);
