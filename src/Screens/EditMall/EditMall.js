import React, { useEffect, useState } from "react";
import MallForm from "../../components/MallForm/MallForm";
import { firebaseDatabase } from "../../firebase/config";
import notification from "../../utility/notification";
import "./EditMall.css";

function EditMall({ match }) {
  const [mallData, setMallData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mallId, setMallId] = useState("");
  useEffect(() => {
    firebaseDatabase
      .collection("mall")
      .doc(match.params.mallId)
      .get()
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
  }, []);

  return (
    <div className="edit-mall-container">
      <h2>Edit Mall</h2>
      <div className="mall-edit-form">
        {" "}
        {!loading && (
          <MallForm type="Edit" mallData={mallData} mallId={mallId} />
        )}
      </div>
    </div>
  );
}

export default EditMall;
