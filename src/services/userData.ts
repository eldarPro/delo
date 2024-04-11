import { doc, getDoc } from "firebase/firestore";
import db from "../firebaseConfig";

interface UserData {
  uid: string;
  userType: string;
}

export function setUidUserData(userData: UserData) {
  localStorage.userData = JSON.stringify(userData)
}

export function getUserType() {
  return JSON.parse(localStorage.userData).userType
}

export function getUserUID() {
  return JSON.parse(localStorage.userData).uid
}

export async function getUserData() {
  const uid = JSON.parse(localStorage.userData).uid
  console.log('uid', uid)
  const docSnap = await getDoc(doc(db, "users", uid));
  let result;

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    result = docSnap.data()
  } else {
    result = []
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  console.log('result', result)

  return result
}

export async function getUserTypeFromDB(uid: string) {
  const docSnap = await getDoc(doc(db, "users", uid));
  let result = undefined

  if (docSnap.exists()) {
    result = docSnap.data().userType
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  return result
}

export function checkAuth() {
  return localStorage.isAuth === 'true'
}