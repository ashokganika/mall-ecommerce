import React, { useEffect, useState } from "react";
import MallForm from "../../components/MallForm/MallForm";
import { firebaseDatabase } from "../../firebase/config";
import notification from "../../utility/notification";

function EditMall({ match }) {
  const [mallData, setMallData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebaseDatabase
      .collection("mall")
      .doc(match.params.mallId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setMallData(doc.data());
        } else {
          console.log("no such data");
        }
      })
      .catch((err) => notification.showError("Somthing went wrong"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Edit Mall</h2>
      {!loading && <MallForm type="Edit" mallData={mallData} />}
    </div>
  );
}

export default EditMall;
