import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../firebaseConfig";

export async function getObjectAddresses() {
  const uid = JSON.parse(localStorage.userData).uid
  console.log('uid', uid)
  let result: any[] = [];
  const querySnapshot = await getDocs(collection(db, "object_addresses"));
  querySnapshot.forEach((doc) => {
    if(doc.data().userUID === uid) {
      result.push(doc.data())
    }
  });

  return result
}