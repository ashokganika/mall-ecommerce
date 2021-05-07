import React, { useEffect, useState } from "react";
import MallForm from "../../components/MallForm/MallForm";
import { findOneMall } from "../../services/firebaseDatabaseService";
import notification from "../../utility/notification";
import "./EditMall.css";

function EditMall({ match }) {
  const [mallData, setMallData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mallIds, setMallId] = useState("");
  const { mallId } = match?.params;

  useEffect(() => {
    findOneMall(mallId)
      .then((doc) => {
        if (doc.exists) {
          setMallData(doc.data());
          setMallId(doc.id);
        } else {
          console.log("no such data");
        }
      })
      .catch((err) => notification.showError("Somthing went wrong"))
      .finally(() => setLoading(false));
  }, [mallId]);

  return (
    <div className="edit-mall-container">
      <h2>Edit Mall</h2>
      <div className="mall-edit-form">
        {" "}
        {!loading && (
          <MallForm type="Edit" mallData={mallData} mallId={mallIds} />
        )}
      </div>
    </div>
  );
}

export default EditMall;
