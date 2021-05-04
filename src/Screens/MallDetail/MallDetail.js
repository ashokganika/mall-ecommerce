import React, { useEffect, useState } from "react";
import DetailsHeader from "../../components/DetailsHeader/DetailsHeader";
import Button from "../../components/Button/Button";
import DashBoardItem from "../../components/DashBoardItem/DashBoardItem";
import { findOneMall } from "../../services/firebaseDatabaseService";
import "./mallDetail.css";
import notification from "../../utility/notification";
import { useDispatch } from "react-redux";
import { getAllMalls } from "../../redux/allMallsSlice";

function MallDetail({ history, match }) {
  const { mallId } = match.params;
  const [mall, setMall] = useState({});
  const [loading, setLoading] = useState(true);

  const { mallName, mallAddress, shops } = mall;

  const dispatch = useDispatch();
  console.log(mall);

  useEffect(() => {
    dispatch(getAllMalls());
    const findMall = async () => {
      try {
        const mall = await findOneMall(mallId);
        if (mall.exists) {
          setMall({ ...mall.data(), mallId: mall.id });
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
    return findMall;
  }, [mallId]);

  return (
    <>
      {loading ? (
        "loading..."
      ) : (
        <div className="mall-detail">
          <DetailsHeader title={mallName} subtitle={mallAddress} />

          <div className="add-shopbtn">
            <Button
              type="button"
              text="Add Shop"
              disabled={false}
              onClick={() => history.push(`/admin/mall/add-shop/${mallId}`)}
            />
          </div>
          {shops.length ? (
            <>
              {" "}
              <DashBoardItem title="Shops" data={shops} titleId={mallId} />
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
            </>
          ) : (
            "no shops to show"
          )}
        </div>
      )}
    </>
  );
}

export default MallDetail;
