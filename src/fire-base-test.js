import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

firestore
  .collection("users")
  .doc("q72w4RHD5YUipajQ44M6")
  .collection("cartItems")
  .doc("2tl9WKWYyKpoJ7aynNMk");

firestore.collection("/users/q72w4RHD5YUipajQ44M6/cartItems");
firestore.doc("/users/q72w4RHD5YUipajQ44M6/displayName");
