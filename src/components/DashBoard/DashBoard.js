import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { findAllMall } from "../../services/firebaseDatabaseService";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Button from "../Button/Button";
import DashBoardItem from "../DashBoardItem/DashBoardItem";
import Search from "../Search/Search";
import notification from "../../utility/notification";
import "./dashboard.css";

function DashBoard({ history, match }) {
  const [stateMall, setStateMall] = useState([]);
  const [filterMall, setStateFilteredMall] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = match.url.split("/")[1] === "admin";

  const onChangeSearch = (e) => {
    if (e.target.value) {
      const re = new RegExp(e.target.value, "gi");
      const filteredMalls = stateMall.filter((mall) => mall.mallName.match(re));
      setStateFilteredMall(
        filteredMalls.slice(
          filteredMalls.length > 3 ? filteredMalls.length - 3 : filteredMalls
        )
      );
    } else setStateFilteredMall(stateMall.slice(stateMall.length - 3));
  };

  const shopFiltered = filterMall.reduce((arr, item) => {
    arr.push({ ...item.shops[0], mallId: item.id });
    return arr;
  }, []);

  useEffect(() => {
    const findMall = async () => {
      try {
        const malls = await findAllMall();
        const allMalls = [];
        malls.forEach((mall) => allMalls.push({ id: mall.id, ...mall.data() }));
        setStateFilteredMall(allMalls.slice(allMalls.length - 3));
        setStateMall(allMalls);
      } catch (error) {
        notification.showError("could not load mall.try again");
      } finally {
        setLoading(false);
      }
    };
    findMall();
    return findMall;
  }, []);

  return (
    <>
      {isAdmin && <AdminNavbar />}
      {!isAdmin && (
        <div className="search-malls">
          <Search placeHolder="Search Mall ..." onChange={onChangeSearch} />
        </div>
      )}
      <div className="dashboard-container">
        {isAdmin && (
          <Button
            text="Add New Mall"
            onClick={() => history.push("/admin/add-mall")}
            type="button"
          />
        )}
        <DashBoardItem title="Malls" data={filterMall} />
        <div
          className="view-all"
          onClick={() => history.push("/admin/admin-all-malls")}
        >
          <span>View All</span>
        </div>
        <DashBoardItem title="Shops" data={shopFiltered} />
        <div className="view-all">
          <span onClick={() => history.push("/admin/admin-all-shops")}>
            View All
          </span>
        </div>
      </div>
    </>
  );
}

export default withRouter(DashBoard);
