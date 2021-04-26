import React from "react";
import MallForm from "../../components/MallForm/MallForm";
import "./AddMall.css";

function AddMall() {
  return (
    <div className="addmall-container">
      <h2>Add Mall and it's details</h2>
      <MallForm
        type="Add"
        mallData={{ mallName: "", mallAddress: "", mallImage: null, shops: [] }}
      />
    </div>
  );
}

export default AddMall;
