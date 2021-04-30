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
