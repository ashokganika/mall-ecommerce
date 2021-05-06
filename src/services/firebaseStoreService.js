import { firebaseStore } from "../firebase/config";

export const addShopImages = () => {
  return firebaseStore;
};

export const removeMallImages = async (images) => {
  await Promise.all(
    images?.map((image, i) => firebaseStore.ref(images[i]).delete())
  );
};

export const removeShopImagefromMallShop = async (images) => {
  await Promise.all(
    images?.map((image, i) => firebaseStore.ref(image).delete())
  );
};

export const removeShopImageFromShopDetail = async (image) => {
  await firebaseStore.ref(image).delete();
};
