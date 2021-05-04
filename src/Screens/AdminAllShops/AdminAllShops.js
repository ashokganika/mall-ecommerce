import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import {
  deleteShopFromMall,
  findAllMall,
} from "../../services/firebaseDatabaseService";
import { removeShopImagefromMallShop } from "../../services/firebaseStoreService";
import notification from "../../utility/notification";
import "./AdminAllShop.css";

function AdminAllShops({ history }) {
  const [loading, setLoading] = useState(true);
  const [allShops, setAllShops] = useState([]);
  const [allMalls, setAllMalls] = useState([]);

  const [filteredShops, setFilteredShops] = useState([]);
  console.log(filteredShops);

  const handleSearchShopChange = (e) => {
    if (e.target.value) {
      const re = new RegExp(e.target.value, "gi");
      const filteredMalls = allShops.filter((shop) => shop.shopName.match(re));
      setFilteredShops(filteredMalls);
    } else setFilteredShops(allShops);
  };

  useEffect(() => {
    findAllMall()
      .then((snapShot) => {
        let mallsDoc = [];
        snapShot.forEach((snap) => {
          mallsDoc.push({ id: snap.id, shops: snap.data().shops });
        });
        setAllMalls(mallsDoc);
        const allShops = mallsDoc.reduce((shopArr, mall) => {
          const oneMallShops = mall.shops.reduce((shop, item) => {
            shop.push({ ...item, mallId: mall.id });
            return shop;
          }, []);
          shopArr = [...shopArr, ...oneMallShops];
          return shopArr;
        }, []);

        setFilteredShops(allShops);
        setAllShops(allShops);
      })
      .catch((err) => console.log("error", err))
      .finally(() => setLoading(false));
  }, []);
  const onClickDetail = (mallId, shopId) => {
    history.push(`/admin/shop-detail/${mallId}/${shopId}`);
  };

  const handleRemoveCardShop = (e, mallId, shopId) => {
    const shopToBeDeleted = allShops.find((shop) => shop.id === shopId);
    const shopAllImages = shopToBeDeleted.shopsImages.map(
      (item) => item.urlName
    );
    const { shops } = allMalls.find((mall) => mall.id === mallId);
    const newShops = shops.filter((shop) => shop.id !== shopId);

    deleteShopFromMall(mallId, newShops)
      .then((res) => {
        removeShopImagefromMallShop(shopAllImages);
        notification.showSuccess("shop deleted sucessfully");
        setFilteredShops([...allShops.filter((shop) => shop.id !== shopId)]);
        setAllShops([...allShops.filter((shop) => shop.id !== shopId)]);
      })
      .catch((err) => notification.showError("could not delete shops"));

    e.stopPropagation();
  };

  return (
    <div className="all-shop-container">
      <div className="search-all-shop">
        <Search
          placeHolder="Search Shops..."
          onChange={handleSearchShopChange}
        />
      </div>
      <div className="shop-list">
        <p className="shops-title">Shops</p>
        <div className="all-shop-list">
          {loading
            ? "loading..."
            : filteredShops?.length
            ? filteredShops?.map((shop) => (
                <LazyLoad key={shop.id} height={350} offsetHorizontal={50}>
                  <Card
                    image={shop.shopsImages[0].url}
                    heading={shop.shopName}
                    id={shop.id}
                    mallId={shop.mallId}
                    onClickDetail={() => onClickDetail(shop.mallId, shop.id)}
                    handleRemoveCard={(e) =>
                      handleRemoveCardShop(e, shop.mallId, shop.id)
                    }
                  />
                </LazyLoad>
              ))
            : "No any shop to show"}
        </div>
      </div>
    </div>
  );
}

export default AdminAllShops;
