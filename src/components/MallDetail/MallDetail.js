import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DetailsHeader from "../DetailsHeader/DetailsHeader";
import Button from "../Button/Button";
import DashBoardItem from "../DashBoardItem/DashBoardItem";
import { findOneMall } from "../../services/firebaseDatabaseService";
import notification from "../../utility/notification";
import { getAllMalls } from "../../redux/allMallsSlice";
import { withRouter } from "react-router";
import Admin from "../../utility/isAdmin";
import Search from "../Search/Search";
import "./mallDetail.css";
import Loading from "../Loading/Loading";

function MallDetail({ history, match, role }) {
  const { mallId } = match.params;
  const [mall, setMall] = useState({});
  const [filteredShops, SetFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const { mallName, mallAddress, shops } = mall;
  const isAdmin = Admin(match.url);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMalls());
    const findMall = async () => {
      try {
        const mall = await findOneMall(mallId);
        if (mall.exists) {
          setMall({ ...mall.data(), mallId: mall.id });
          SetFilteredShops(mall.data().shops);
        } else {
          notification.showInfo("no such mall");
        }
      } catch (error) {
        notification.showError("could not load mall.try again");
      } finally {
        setLoading(false);
      }
    };
    findMall();
    return () => findMall();
  }, [mallId, dispatch]);

  const handleShopSearch = (e) => {
    if (e.target.value) {
      const re = new RegExp(e.target.value, "gi");
      const shopsFiltered = shops.filter((shop) => shop.shopName.match(re));

      SetFilteredShops(shopsFiltered);
    } else {
      SetFilteredShops(shops);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mall-detail">
          <DetailsHeader title={mallName} subtitle={mallAddress} />
          <div className="search-shop-container-in-mallDetail">
            <Search placeHolder="Search Shops..." onChange={handleShopSearch} />
          </div>

          {isAdmin && (
            <div className="add-shopbtn">
              <Button
                type="button"
                text="Add Shop"
                disabled={false}
                onClick={() => history.push(`/admin/mall/add-shop/${mallId}`)}
              />
            </div>
          )}
          {filteredShops.length ? (
            <>
              {" "}
              <DashBoardItem
                title="Shops"
                data={filteredShops}
                titleId={mallId}
                role={role}
              />
              {isAdmin && (
                <div className="add-shopbtn">
                  <Button
                    type="button"
                    text="Edit Mall"
                    disabled={false}
                    onClick={() =>
                      history.push(`/admin/mall/edit-mall/${mallId}`)
                    }
                  />
                </div>
              )}
            </>
          ) : (
            <h2>no shops to show</h2>
          )}
        </div>
      )}
    </>
  );
}

MallDetail.defaultProps = {
  role: "user",
};

export default withRouter(MallDetail);
