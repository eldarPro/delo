import { IonButton, IonLoading } from "@ionic/react";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useHistory } from "react-router";

const LogoutButton = () => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false); 

  const handleLogout = async () => {
    setLoading(true); 

    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('success logout')
      localStorage.isAuth = 'false'
      history.push('/login');
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IonLoading duration={0} isOpen={isLoading} />
      <IonButton fill='outline' color="medium" className="ion-padding" slot="fixed" onClick={handleLogout}>Выйти</IonButton>
    </>
  );
};

export default LogoutButton;