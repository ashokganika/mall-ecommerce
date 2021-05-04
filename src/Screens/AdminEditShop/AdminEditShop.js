import React, { useEffect, useState } from "react";
import EditShop from "../../components/EditShop/EditShop";
import { firebaseDatabase } from "../../firebase/config";

function AdminEditShop({ match }) {
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState({});
  const [shops, setShops] = useState([]);

  useEffect(() => {
    firebaseDatabase
      .collection("mall")
      .doc(match?.params?.mallId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setShop(
            doc.data().shops.find((shop) => shop.id === match.params.shopId)
          );
          setShops(doc.data().shops);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <EditShop
          mallId={match.params.mallId}
          shopId={match.params.shopId}
          shop={shop}
          shops={shops}
        />
      )}
    </>
  );
}

export default AdminEditShop;
