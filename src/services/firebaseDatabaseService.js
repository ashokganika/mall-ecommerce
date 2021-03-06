import { firebaseDatabase } from "../firebase/config";

export const findOneMall = (id) => {
  return firebaseDatabase.collection("mall").doc(id).get();
};

export const findAllMall = () => {
  return firebaseDatabase.collection("mall").get();
};

export const findAdmin = () => {
  return firebaseDatabase.collection("users").doc("LsiODH9HkfDxQJDF2Jyf").get();
};

export const deleteMall = (id) => {
  return firebaseDatabase.collection("mall").doc(id).delete();
};

export const deleteShopFromMall = (id, shops) => {
  return firebaseDatabase.collection("mall").doc(id).update({ shops });
};

export const editMall = (mall, id) => {
  return firebaseDatabase
    .collection("mall")
    .doc(id)
    .set({ ...mall });
};

export const editShop = (mallId, shops) => {
  return firebaseDatabase.collection("mall").doc(mallId).update({ shops });
};
