import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../firebaseConfig";

export async function getEstimates() {
  const uid = JSON.parse(localStorage.userData).uid
  console.log('uid', uid)
  let result: any[] = [];
  const querySnapshot = await getDocs(collection(db, "estimates"));
  querySnapshot.forEach((doc) => {
    if(doc.data().userUID === uid) {
      result.push(doc.data())
    }
  });

  return result
}