import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router";

const logout = async() => {
  const history = useHistory();
  const auth = getAuth();
  await signOut(auth).then(() => {
      // Sign-out successful.
      history.push('/login');
  }).catch((error) => {
      // An error happened.
  });
};


export default logout