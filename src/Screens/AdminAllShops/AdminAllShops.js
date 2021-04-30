import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import { findAllMall } from "../../services/firebaseDatabaseService";
import "./AdminAllShop.css";

function AdminAllShops({ history }) {
  const [loading, setLoading] = useState(true);
  const [allShops, setAllShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);

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
        const allShops = mallsDoc.reduce((shopArr, mall) => {
          const oneMallShops = mall.shops.reduce((shop, item) => {
            shop.push({ ...item, mallId: mall.id });
            return shop;
          }, []);
          shopArr = [...shopArr, ...oneMallShops];
          return shopArr;
        }, []);

        // console.log(allShops);
        setFilteredShops(allShops);
        setAllShops(allShops);
      })
      .catch((err) => console.log("error", err))
      .finally(() => setLoading(false));
  }, []);
  const onClickDetail = (mallId, shopId) => {
    // console.log("show shop detail ");
    history.push(`/admin/shop-detail/${mallId}/${shopId}`);
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
