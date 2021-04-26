import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import Button from "../Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ShopForm from "../ShopForm/ShopForm";
import "./MallForm.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { firebaseDatabase, firebaseStore } from "../../firebase/config";
import { resetShopImages } from "../../redux/shopImageSlice";
import notification from "../../utility/notification";
import { withRouter } from "react-router";

// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const schema = yup.object().shape({
  mallName: yup.string().required(),
  mallAddress: yup.string().required(),
});

function MallForm({ history, type, mallData }) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...mallData,
    },
  });

  const { control, reset } = methods;

  const { fields, append } = useFieldArray({
    control,
    name: "shops",
  });
  const [mallImage, setMallImage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const photoImageState = useSelector(
    (state) => state.shopImageReducer,
    shallowEqual
  );

  const dispatch = useDispatch();

  const handleMallImageChange = (e) => {
    setMallImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (type === "Add") {
      try {
        await firebaseStore.ref(mallImage.name).put(mallImage);

        await Promise.all(
          photoImageState.images.map((item) =>
            Promise.all(
              item.images.map((image) =>
                firebaseStore.ref(image.name).put(image)
              )
            )
          )
        );
        const mallUrl = await firebaseStore
          .ref(mallImage.name)
          .getDownloadURL();

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

        data.mallImage = {
          imageName: mallImage.name,
          imageUrl: mallUrl,
        };

        await firebaseDatabase.collection("mall").add(data);
        notification.showSuccess("sucessfully Added Mall");
        reset();
        setMallImage(null);
        dispatch(resetShopImages());
        history.push("/dashboard");
      } catch (error) {
        console.log(error);
        notification.showError("could not add the mall...please try again");
      } finally {
        setLoading(false);
      }
    } else if (type === "Edit") {
      setLoading(false);
      try {
        if (mallImage) {
          await firebaseStore.ref(mallImage.name).put(mallImage);
          firebaseStore.ref(data.mallImage.imageName).delete();
          const mallUrl = await firebaseStore
            .ref(mallImage.name)
            .getDownloadURL();
          data.mallImage = {
            imageName: mallImage.name,
            imageUrl: mallUrl,
          };
        }
        if (photoImageState.images.length) {
          await Promise.all(
            photoImageState.images.map((item) =>
              Promise.all(
                item.images.map((image) =>
                  firebaseStore.ref(image.name).put(image)
                )
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
          const structuredUrl = url.map((item, index) => ({
            id: photoImageState.images[index].id,
            url: url[index],
          }));

          data.shops = structuredUrl.map((u, i) =>
            data.shops.map((shop, index) =>
              u.id === index
                ? {
                    ...shop,
                    id: mallData.shops[index].id,
                    shopImages: [
                      ...mallData.shops[index].shopsImages,
                      ...structuredUrl[i].url,
                    ],
                  }
                : {
                    ...shop,
                    id: mallData.shops[index].id,
                    shopImages: [...mallData.shops[index].shopsImages],
                  }
            )
          );
          console.log(data);
        }
      } catch (error) {
        console.log("errrorobject", error);
      }
    }
  };

  return (
    <div className="mallForm">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Controller
            control={methods.control}
            name="mallName"
            render={({ field }) => (
              <TextField
                label="Mall Name"
                variant="filled"
                error={!!methods.formState.errors.mallName}
                helperText={methods?.formState?.errors?.mallName?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="mallAddress"
            render={({ field }) => (
              <TextField
                label="Mall Address"
                error={!!methods.formState.errors.mallAddress}
                helperText={methods?.formState?.errors?.mallAddress?.message}
                variant="filled"
                {...field}
              />
            )}
          />

          <input type="file" onChange={handleMallImageChange} />
          <small>{methods.formState.errors?.mallImage?.message}</small>
          <hr />
          <h2>Add shops</h2>
          {fields.map((item, index) => (
            <ShopForm shop={item} index={index} key={item.id} type={type} />
          ))}
          {type === "Add" && (
            <Button
              type="button"
              onClick={() => {
                append({ shopName: "", shopDetail: "", shopImages: [] });
              }}
              text="Add More shops"
            />
          )}

          <hr />
          <Button
            text={isLoading ? "Saving..." : `${type}`}
            type="submit"
            disabled={isLoading}
          />
        </form>
      </FormProvider>
    </div>
  );
}

export default withRouter(MallForm);
