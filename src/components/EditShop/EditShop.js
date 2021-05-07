import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import Button from "../Button/Button";
import ShopForm from "../ShopForm/ShopForm";
import notification from "../../utility/notification";

import "./EditShop.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { editShop } from "../../services/firebaseDatabaseService";
import { firebaseStore } from "../../firebase/config";
import { resetShopImages } from "../../redux/shopImageSlice";
import { withRouter } from "react-router";

function EditShop({ mallId, shopId, shop, shops, history }) {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      shops: [{ ...shop }],
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { fields } = useFieldArray({
    control,
    name: "shops",
  });

  const photoImageState = useSelector(
    (state) => state.shopImageReducer,
    shallowEqual
  );

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      data = { ...shop, ...data.shops[0] };
      if (photoImageState.images.length) {
        await Promise.all(
          photoImageState.images[0].images.map((image) =>
            firebaseStore.ref(image.name).put(image)
          )
        );

        const url = await Promise.all(
          photoImageState.images[0].images.map((image) =>
            firebaseStore.ref(image.name).getDownloadURL()
          )
        );
        data.shopsImages = [
          ...data.shopsImages,
          ...url.map((item, i) => ({
            url: item,
            urlName: photoImageState.images[0].images[i].name,
          })),
        ];
        const newShop = shops.map((shopItem) =>
          shopItem.id === shopId ? { ...data } : shopItem
        );
        await editShop(mallId, newShop);
        notification.showSuccess("sucessfully updated shop");
        dispatch(resetShopImages());
        history.goBack();
      } else {
        const newShop = shops.map((shopItem) =>
          shopItem.id === shopId ? { ...data } : shopItem
        );
        await editShop(mallId, newShop);
        notification.showSuccess("sucessfully updated shop");
        history.goBack();
      }
    } catch (error) {
      notification.show("could not update shop");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="eidt-shop-container">
      <h2>Edit Shop</h2>
      <div className="edit-shop-form">
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

            <hr />
            <hr />

            <Button
              text={submitting ? "Saving..." : "Edit Shop"}
              type="Edit"
              disabled={submitting}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default withRouter(EditShop);
