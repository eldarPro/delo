import { doc, getDoc } from "firebase/firestore";
import db from "../firebaseConfig";

export async function getResume() {
    const uid = JSON.parse(localStorage.userData).uid
    console.log('uid', uid)
    const docSnap = await getDoc(doc(db, "resumes", uid));
    let result;
  
    if (docSnap.exists()) {
      console.log("Resume data:", docSnap.data());
      result = docSnap.data()
    } else {
      result = []
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  
    console.log('result', result)
  
    return result
  }