import React from "react";
import DetailsHeader from "../../components/DetailsHeader/DetailsHeader";
import Button from "../../components/Button/Button";
import DashBoardItem from "../../components/DashBoardItem/DashBoardItem";
import "./mallDetail.css";

function MallDetail({ history }) {
  return (
    <div className="mall-detail">
      <DetailsHeader
        title="People's Plaza"
        subtitle="KichaPokhari, Kathmandu"
      />

      <div className="add-shopbtn">
        <Button
          type="button"
          text="Add Shop"
          disabled={false}
          onClick={() => history.push("/mall/add-shop/ZAvLDMDBBcxdQPAiC9U9")}
        />
      </div>
      <DashBoardItem title="Shops" />
      <div className="add-shopbtn">
        <Button
          type="button"
          text="Edit Mall"
          disabled={false}
          onClick={() => history.push("/mall/edit-mall/ZAvLDMDBBcxdQPAiC9U9")}
        />
      </div>
    </div>
  );
}

export default MallDetail;
