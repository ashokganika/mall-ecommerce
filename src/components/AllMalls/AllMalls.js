import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import Search from "../Search/Search";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { removeMallImages } from "../../services/firebaseStoreService";
import {
  deleteMall,
  findAllMall,
} from "../../services/firebaseDatabaseService";
import notification from "../../utility/notification";
import Admin from "../../utility/isAdmin";
import Loading from "../Loading/Loading";
import allImagesFromMall from "../../utility/allImagesFromMall";
import { withRouter } from "react-router";
import "./allmalls.css";

function AllMalls({ history, role, match }) {
  const [malls, setMalls] = useState([]);
  const [filterMalls, setFilterMalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    if (e.target.value) {
      const re = new RegExp(e.target.value, "gi");
      const filteredMalls = malls.filter((mall) => mall.mallName.match(re));
      setFilterMalls(filteredMalls);
    } else setFilterMalls(malls);
  };

  useEffect(() => {
    findAllMall()
      .then((snapShot) => {
        let mallsDoc = [];
        snapShot.forEach((snap) => {
          mallsDoc.push({ id: snap.id, ...snap.data() });
        });
        setMalls(mallsDoc);
        setFilterMalls(mallsDoc);
      })
      .catch((err) => console.log("error", err))
      .finally(() => setLoading(false));
  }, []);

  const handleRemoveCardMall = (e, mallId) => {
    const mallTobeDeleted = malls.find((mall) => mall.id === mallId);
    deleteMall(mallId)
      .then((res) => {
        const allImg = allImagesFromMall(mallTobeDeleted);
        removeMallImages(allImg);
        notification.showSuccess("sucessfully deleted");
        setMalls([...malls.filter((mall) => mall.id !== mallId)]);
        setFilterMalls([...malls.filter((mall) => mall.id !== mallId)]);
      })
      .catch((err) => notification.showError("could not delete try again"));
    e.stopPropagation();
  };
  const isAdmin = Admin(match.url);

  return (
    <div className="admin-all-malls">
      <div className="search-comp">
        <Search placeHolder="Search Malls" onChange={handleSearchChange} />
      </div>
      {isAdmin && (
        <div className="add-new-mall-btn">
          <Button
            type="button"
            text="Add New Mall"
            onClick={() => history.push("/admin/add-mall")}
            disabled={false}
          />
        </div>
      )}

      <div className="allmall-heading">
        <p> Malls</p>
      </div>
      <div className="mall-list">
        {loading ? (
          <Loading />
        ) : filterMalls.length ? (
          filterMalls.map((mall) => (
            <LazyLoad key={mall.id} height={300} offsetHorizontal={50}>
              <Card
                image={mall.mallImage.imageUrl}
                heading={mall.mallName}
                subHeading={mall.mallAddress}
                onClickDetail={() =>
                  role === "admin"
                    ? history.push(`/admin/mall-detail/${mall.id}`)
                    : history.push(`/mall-detail/${mall.id}`)
                }
                handleRemoveCard={(e) => handleRemoveCardMall(e, mall.id)}
              />
            </LazyLoad>
          ))
        ) : (
          <h3>No any data to show</h3>
        )}
      </div>
    </div>
  );
}

AllMalls.defaultProps = {
  role: "user",
};

export default withRouter(AllMalls);
