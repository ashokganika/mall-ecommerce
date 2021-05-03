import React from "react";
import { useFormContext } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addShopImage, deleteShopImage } from "../../redux/shopImageSlice";
import "./shopForm.css";

function ShopForm({ index, type, shop, error }) {
  const { register } = useFormContext();
  console.log(error, "fdfd");
  const dispatch = useDispatch();
  const photoImageState = useSelector(
    (state) => state.shopImageReducer,
    shallowEqual
  );

  const handleChangeFile = (e, id) => {
    const { files } = e.target;
    dispatch(addShopImage({ id: id, images: [...files] }));
  };

  const handleImageRemove = (index, filename) => {
    dispatch(deleteShopImage({ index, filename }));
  };
  return (
    <>
      <div className="shopformContainer">
        <div className="input-field">
          <label htmlFor="">Shop Name</label>
          <input
            type="text"
            {...register(`shops[${index}].shopName`, {
              required: { value: true, message: "shop name required" },
            })}
          />
          <small className="error">{error?.shopName?.message}</small>
        </div>
        <div className="input-field">
          <label htmlFor="">Shop Description</label>
          <textarea {...register(`shops[${index}].shopDetail`)} />
        </div>
        <div className="input-field">
          <label htmlFor="">Add Shop Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleChangeFile(e, index)}
          />

          <small className="error">First image will be thumbnail</small>
        </div>

        {photoImageState?.images[index]?.images?.map((file, i) => {
          return (
            <div key={i} className="image-detail-action">
              <small>{file.name}</small>
              <p
                className="image-delete-action"
                onClick={() => handleImageRemove(index, file.name)}
              >
                X
              </p>
            </div>
          );
        })}
      </div>
      <hr></hr>
      <hr></hr>
    </>
  );
}

export default ShopForm;
