import React from "react";
import { useFormContext } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addShopImage, deleteShopImage } from "../../redux/shopImageSlice";
import "./shopForm.css";

function ShopForm({ index, type, shop }) {
  const { register } = useFormContext();

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
        <input
          type="text"
          {...register(`shops[${index}].shopName`, { required: true })}
        />
        <textarea
          {...register(`shops[${index}].shopDetail`, { required: true })}
        />
        <input
          type="file"
          multiple
          onChange={(e) => handleChangeFile(e, index)}
        />
        {type === "Addd" && (
          <small className="error">First image will be thumbnail</small>
        )}
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
    </>
  );
}

export default ShopForm;
