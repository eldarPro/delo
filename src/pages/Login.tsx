import { IonContent, IonPage, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonFooter, IonFab, useIonToast, IonLoading } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useHistory } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebaseConfig';
import { getUserData, getUserTypeFromDB, setUidUserData } from '../services/userData';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setLoading] = useState<boolean>(false);

  const history = useHistory()

  async function handleLogin() {

    setLoading(true)

    let uid;
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      uid = userCredential.user.uid;
      console.log('uid', uid)
    })
    .catch((error) => {
      const errorCode = error.code;
      let errorMessage = error.message;

      if(errorCode === 'auth/invalid-email') {
        errorMessage = 'Аккаунт не найден'
      }

      presentToast(errorMessage)
    }).finally(() => {
      setLoading(false)
    });

    if(uid) {
      localStorage.isAuth = 'true'
      const userType = await getUserTypeFromDB(uid)
      console.log('userType', userType)
      setUidUserData({uid: uid, userType: userType })
      history.replace('/profile');
    }
   
  }

  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === '') return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const [present] = useIonToast();

  const presentToast = (text: string) => {
    present({
      message: text,
      duration: 1500,
      position: 'top',
      color: 'danger'
    });
  };

  return (
    <IonPage>
      <IonLoading duration={0} isOpen={isLoading} />
      <IonHeader> 
        <IonToolbar>
          <IonTitle>Авторизация</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <br />
        <IonInput
          className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
          type="email"
          fill="outline"
          label="Email"
          placeholder="Введите почту"
          labelPlacement="floating"
          errorText="Некорректный email"
          onIonInput={(event) => validate(event)}
          onIonChange={(e) => setEmail(e.detail.value!)}
          onIonBlur={() => markTouched()} />
        <br />
        <IonInput 
         type="password"
          label="Пароль" 
          labelPlacement="floating" 
          fill="outline" 
          placeholder="Введите пароль" 
          onIonChange={(e) => setPassword(e.detail.value!)} />
        </IonContent>

      <div slot="fixed" className="ion-text-center">
        <Link to='/reg'>Создать новый аккаунт</Link>
      </div>
      <IonButton className="ion-padding" slot="fixed" size="large" expand="full" onClick={handleLogin}>Войти</IonButton>

    </IonPage>
  );
};

export default Login;