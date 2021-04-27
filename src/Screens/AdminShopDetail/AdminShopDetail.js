import React, { useEffect, useState } from "react";
import DetailsHeader from "../../components/DetailsHeader/DetailsHeader";
import { findOneMall } from "../../services/firebaseDatabaseService";
import notification from "../../utility/notification";
import Card from "../../components/Card/Card";
import "./adminshopdetails.css";
import Button from "../../components/Button/Button";

function AdminShopDetail({ match, history }) {
  const { mallId, shopId } = match?.params;

  const [shop, setShop] = useState({});
  const [loading, setLoading] = useState(true);
  const { shopName, shopDetail, shopsImages } = shop || {};

  useEffect(() => {
    const findMall = async () => {
      try {
        const mall = await findOneMall(mallId);
        if (mall.exists) {
          setShop(mall.data().shops.find((item) => item.id === shopId));
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
  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <div className="shopDetails-Container">
          <div className="shopdetail-header">
            <DetailsHeader title={shopName} subtitle={shopDetail} />
          </div>
          <Button
            type="button"
            text="Edit shop"
            onClick={() => history.push(`/`)}
            disabled={false}
          />
          <div className="shopdetails-images">
            {shopsImages?.length
              ? shopsImages.map((img, index) => (
                  <Card image={img.url} key={index} />
                ))
              : "no any shop images"}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminShopDetail;
