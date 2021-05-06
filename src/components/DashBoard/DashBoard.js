import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { findAllMall } from "../../services/firebaseDatabaseService";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Button from "../Button/Button";
import DashBoardItem from "../DashBoardItem/DashBoardItem";
import Search from "../Search/Search";
import notification from "../../utility/notification";
import Admin from "../../utility/isAdmin";
import { getAllMalls } from "../../redux/allMallsSlice";
import "./dashboard.css";

function DashBoard({ history, match, role }) {
  const [stateMall, setStateMall] = useState([]);
  const [filterMall, setStateFilteredMall] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const isAdmin = Admin(match.url);

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
    dispatch(getAllMalls());
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
        {loading ? (
          "loading"
        ) : filterMall.length ? (
          <>
            <DashBoardItem title="Malls" data={filterMall} role={role} />
            {filterMall?.length > 2 ? (
              <div
                className="view-all"
                onClick={() =>
                  role === "admin"
                    ? history.push("/admin/admin-all-malls")
                    : history.push("/all-malls")
                }
              >
                <span>View All</span>
              </div>
            ) : (
              ""
            )}
            <DashBoardItem title="Shops" data={shopFiltered} role={role} />
            {shopFiltered?.length > 2 ? (
              <div className="view-all">
                <span
                  onClick={() =>
                    role === "admin"
                      ? history.push("/admin/admin-all-shops")
                      : history.push("/all-shops")
                  }
                >
                  View All
                </span>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          "no data to show"
        )}
      </div>
    </>
  );
}

DashBoard.defaultProps = {
  role: "user",
};

export default withRouter(DashBoard);
