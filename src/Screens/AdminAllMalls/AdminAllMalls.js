import React, { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { firebaseDatabase } from "../../firebase/config";
import "./adminallmalls.css";

function AdminAllMalls({ history }) {
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
    firebaseDatabase
      .collection("mall")
      .get()
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

  return (
    <div className="admin-all-malls">
      <div className="search-comp">
        <Search placeHolder="Search Malls" onChange={handleSearchChange} />
      </div>
      <div className="add-new-mall-btn">
        <Button
          type="button"
          text="Add New Mall"
          onClick={() => history.push("/add-mall")}
          disabled={false}
        />
      </div>
      <div className="allmall-heading">
        <p> Malls</p>
      </div>
      <div className="mall-list">
        {loading
          ? "loading..."
          : filterMalls.length
          ? filterMalls.map((mall) => (
              <Card
                key={mall.id}
                image={mall.mallImage.imageUrl}
                heading={mall.mallName}
                subHeading={mall.mallAddress}
                onClickDetail={() => history.push(`/mall-detail/${mall.id}`)}
              />
            ))
          : "No any data to show"}
      </div>
    </div>
  );
}

export default AdminAllMalls;
