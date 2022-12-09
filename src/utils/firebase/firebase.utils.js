import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  writeBatch,
  query,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  FieldValue,
} from "firebase/firestore";
import { Flip, toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCiYohj5eYTY6gbvA7I_cmxzmqfwYlh_Dk",
  authDomain: "yelpcamp-df8a1.firebaseapp.com",
  projectId: "yelpcamp-df8a1",
  storageBucket: "yelpcamp-df8a1.appspot.com",
  messagingSenderId: "235242442140",
  appId: "1:235242442140:web:7c11b7a170568c1ff7cc59",
  measurementId: "G-S79Y0XSQQS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

export const createUserAuthWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const createUserDocumentFromAuth = async (userAuth, otherInfo = {}) => {
  const { uid, displayName, email } = userAuth;

  const docRef = doc(db, "users", uid);

  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    await setDoc(docRef, {
      displayName: displayName,
      email: email,
      createdAt: new Date().toLocaleString(),
      ...otherInfo,
    });

    return (await getDoc(docRef)).data();
  }
};

export const signOutUser = () => signOut(auth);

export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

export const uploadDocumentsToDB = async (array, collectionName) => {
  const batch = writeBatch(db);
  array.map((child) => {
    const ref = doc(db, collectionName, child.name.toLowerCase());
    return batch.set(ref, {
      ...child,
    });
  });
  await batch.commit();
  console.log("done");
};

export const uploadReviewToDb = async (data, collectionName, docId) => {
  const ref = doc(db, collectionName, docId);
  await updateDoc(ref, {
    reviews: arrayUnion({ ...data }),
  });
};

export const getDocumentsFromDb = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const uploadImageToDb = async (file) => {
  const imageRef = ref(storage, file.name);
  const uploadTask = await uploadBytesResumable(imageRef, file);
  const downloadUrl = await getDownloadURL(imageRef);
  return downloadUrl;
};

export const deleteItemFromArray = async (collectionName, docId, item) => {
  const docRef = doc(db, collectionName, docId);

  toast.promise(
    updateDoc(docRef, {
      reviews: arrayRemove(item),
    }),
    {
      pending: "Deleting Comment",
      error: "Error deleting comment",
      success: "Comment deleted",
    }
  );
};
