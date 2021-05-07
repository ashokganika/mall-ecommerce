import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import DetailsHeader from "../DetailsHeader/DetailsHeader";
import { editShop, findOneMall } from "../../services/firebaseDatabaseService";
import notification from "../../utility/notification";
import { removeShopImageFromShopDetail } from "../../services/firebaseStoreService";
import Card from "../Card/Card";
import Button from "../Button/Button";
import Admin from "../../utility/isAdmin";
import "./shopdetails.css";
import Loading from "../Loading/Loading";

function AdminShopDetail({ match, history, role }) {
  const [shop, setShop] = useState({});
  const [mallShop, setMallShop] = useState([]);
  const [loading, setLoading] = useState(true);

  const { mallId, shopId } = match?.params;
  const { shopName, shopDetail, shopsImages } = shop || {};
  const isAdmin = Admin(match.url);

  useEffect(() => {
    const findMall = async () => {
      try {
        const mall = await findOneMall(mallId);
        if (mall.exists) {
          setShop(mall.data().shops.find((item) => item.id === shopId));
          setMallShop(mall.data().shops);
        } else {
          notification.showInfo("no such mall and shop");
        }
      } catch (error) {
        notification.showError("could not load mall.try again");
      } finally {
        setLoading(false);
      }
    };
    findMall();
    return findMall;
  }, [mallId, shopId]);

  const handleRemoveCard = async (mallid, shopid, shopUrl, shopImgName) => {
    const newShop = mallShop?.map((singleShop) =>
      singleShop.id === shopid
        ? {
            ...singleShop,
            shopsImages: singleShop.shopsImages.filter(
              (img) => img.url !== shopUrl
            ),
          }
        : singleShop
    );
    try {
      await editShop(mallid, newShop);
      await removeShopImageFromShopDetail(shopImgName);
      notification.showSuccess("image of shop deleted sucessfully");
      setShop((prev) => ({
        ...prev,
        shopsImages: prev.shopsImages.filter((img) => img.url !== shopUrl),
      }));
    } catch (error) {
      notification.showError("could not delete...");
    }
    console.log("object", mallid, shopid, shopUrl, newShop);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="shopDetails-Container">
          <div className="shopdetail-header">
            <DetailsHeader title={shopName} subtitle={shopDetail} />
          </div>
          {isAdmin && (
            <Button
              type="button"
              text="Edit shop"
              onClick={() =>
                history.push(`/admin/edit-shop/${mallId}/${shopId}`)
              }
              disabled={false}
            />
          )}
          <div className="shopdetails-images">
            {shopsImages?.length ? (
              shopsImages.map((img, index) => (
                <Card
                  image={img.url}
                  key={index}
                  handleRemoveCard={() =>
                    handleRemoveCard(mallId, shopId, img.url, img.urlName)
                  }
                />
              ))
            ) : (
              <h2>no shops to show</h2>
            )}
          </div>
        </div>
      )}
    </>
  );
}

AdminShopDetail.defaultProps = {
  role: "user",
};

export default withRouter(AdminShopDetail);
