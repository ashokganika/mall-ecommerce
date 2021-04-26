import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import uuid from "react-uuid";
import Button from "../../components/Button/Button";
import ShopForm from "../../components/ShopForm/ShopForm";
import { firebaseDatabase, firebaseStore } from "../../firebase/config";
import { resetShopImages } from "../../redux/shopImageSlice";
import notification from "../../utility/notification";

function AddShop({ history, match }) {
  const [loading, setLoading] = useState(false);
  const [oldShops, setOldShops] = useState([]);
  const methods = useForm({
    defaultValues: {
      shops: [{ shopName: "", shopDetail: "", shopImages: [] }],
    },
  });
  const { control, handleSubmit, reset } = methods;
  const { fields, append } = useFieldArray({
    control,
    name: "shops",
  });

  const photoImageState = useSelector(
    (state) => state.shopImageReducer,
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    firebaseDatabase
      .collection("mall")
      .doc(match?.params?.mallId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("doc esists");
          setOldShops(doc.data().shops);
          console.log(doc.data().shops);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await Promise.all(
        photoImageState.images.map((item) =>
          Promise.all(
            item.images.map((image) => firebaseStore.ref(image.name).put(image))
          )
        )
      );

      const url = await Promise.all(
        photoImageState.images.map((item) =>
          Promise.all(
            item.images.map((image) =>
              firebaseStore.ref(image.name).getDownloadURL()
            )
          )
        )
      );
      data.shops = data.shops.map((item, i) => ({
        ...item,
        id: uuid(),
        shopsImages: url[i].map((items, index) => ({
          url: items,
          urlName: photoImageState.images[i].images[index].name,
        })),
      }));

      await firebaseDatabase
        .collection("mall")
        .doc(match?.params?.mallId)
        .update({ shops: [...data.shops, ...oldShops] });

      reset();
      dispatch(resetShopImages());
      notification.showSuccess("sucessfully Added Shops fro the Mall");
      history.push("/mall-detail/hjdfgh");
    } catch (error) {
      console.log(error);
      notification.showError("could not add the Shops...please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <ShopForm shop={item} index={index} key={item.id} />
        ))}
        <Button
          type="button"
          onClick={() => {
            append({ shopName: "", shopDetail: "", shopImages: [] });
          }}
          text="Add More +"
        />
        <Button
          text={loading ? "Saving..." : "Add Shop"}
          type="submit"
          disabled={loading}
        />
      </form>
    </FormProvider>
  );
}

export default withRouter(AddShop);
