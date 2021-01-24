import firebase from "firebase/app";
import "firebase/firestore"; // for the database
import "firebase/auth"; // for the authentication

const config = {
  apiKey: "AIzaSyBJzmM3gg6JuIfarHpQuWV6YWBKGO4bj5k",
  authDomain: "crwn-clothing-db-cfe43.firebaseapp.com",
  projectId: "crwn-clothing-db-cfe43",
  storageBucket: "crwn-clothing-db-cfe43.appspot.com",
  messagingSenderId: "323624749397",
  appId: "1:323624749397:web:5eebf1104791f8e38e07dc",
  measurementId: "G-3FNY8Q7KLS",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  // console.log(firestore.doc("/users/12kejbfk")); // a random userID
  // console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user ", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithFacebook = () => auth.signInWithPopup(fbProvider);

export default firebase;
