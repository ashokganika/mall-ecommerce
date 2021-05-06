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
import "./AddShop.css";

function AddShop({ history, match }) {
  const [loading, setLoading] = useState(true);
  const [oldShops, setOldShops] = useState([]);
  const [mallName, setMallName] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const methods = useForm({
    defaultValues: {
      shops: [{ shopName: "", shopDetail: "", shopImages: [] }],
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

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
          setOldShops(doc.data().shops);
          setMallName(doc.data().mallName);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
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
      notification.showSuccess("sucessfully Added Shops for the Mall");
      history.push(`/admin/mall-detail/${match.params.mallId}`);
    } catch (error) {
      notification.showError("could not add the Shops...please try again");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      {loading ? (
        "loading..."
      ) : (
        <div className="add-shop-container">
          <h2>{`Add Shop for Mall ${mallName}`}</h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map((item, index) => (
                <ShopForm
                  shop={item}
                  index={index}
                  key={item.id}
                  error={errors?.shops?.length && errors?.shops[index]}
                />
              ))}
              <Button
                type="button"
                onClick={() => {
                  append({ shopName: "", shopDetail: "", shopImages: [] });
                }}
                text="Add More +"
              />
              <hr />
              <hr />

              <Button
                text={submitting ? "Saving..." : "Add Shop"}
                type="submit"
                disabled={submitting}
              />
            </form>
          </FormProvider>
        </div>
      )}
    </>
  );
}

export default withRouter(AddShop);
