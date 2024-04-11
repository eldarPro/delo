import { IonContent, IonPage, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonFooter, IonFab, useIonToast, IonLoading, IonButtons, IonBackButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useHistory, useLocation } from 'react-router-dom';
import db from '../firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { chevronBack } from 'ionicons/icons';
import { setUidUserData, setUserData } from '../services/userData';

const Registration3: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState<boolean>(false)

  interface RouteParams {
    typeUser: string;
    surname: string;
    name: string;
    phone: string;
  }

  const location = useLocation<RouteParams>()

  console.log(location.state)

  const history = useHistory();
 
  async function handleRegistration() {

    if(!email.length || !password.length || !confirmPassword.length) {
      presentToast('Заполните все поля!')
      return false
    }

    if(!isEmailValid || !isPassValid || !isConfirmPassValid) return false

    setIsLoading(true)

    const auth = getAuth();

    let uid = ''

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        uid = user.uid
        console.log('reg user', user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false)
        console.log(errorCode, errorMessage)
        alert('errorMessage')
        return false
      });  
      
    try {
      const userType = location.state.typeUser
      createUser(uid, userType)
      history.push('/profile')
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsLoading(false)
    }
    
  }

  const [present] = useIonToast();

  const createUser = async(uid: string, typeUser: string) => {

    let collectionName;
    let userData;

    if(typeUser === 'customer') {
      userData = {
        userType: typeUser,
        name: location.state.name,
        surname: location.state.surname,
        email: email,
        phone: location.state.phone,
      }
    } else {
      userData = {
        userType: typeUser,
        name: location.state.name,
        surname: location.state.surname,
        email: email,
        rating: '4.0',
        status: 1,
        phone: location.state.phone,
      }
    }

    await setDoc(doc(db, 'users', uid), userData);
    setUidUserData({uid: uid, userType: typeUser})
    localStorage.isAuth = 'true'
  };

  const presentToast = (text: string) => {
    present({
      message: text,
      duration: 1500,
      position: 'top',
      color: 'danger'
    });
  };

  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPassTouched, setIsPassTouched] = useState(false);
  const [isConfirmPassTouched, setIsConfirmPassTouched] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState<boolean>();
  const [isPassValid, setIsPassValid] = useState<boolean>();
  const [isConfirmPassValid, setIsConfirmassValid] = useState<boolean>();

  const [isPassErrorText, setPassErrorText] = useState('');
  const [isConfirmPassErrorText, setIsConfirmPassErrorText] = useState('');

  const validateEmail = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsEmailValid(undefined);

    if (value === '') return;

    const checkValid = value.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );

    checkValid !== null ? setIsEmailValid(true) : setIsEmailValid(false);
  };

  const validatePassword = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsPassValid(undefined);

    if (value === '') return;

    if(value.length < 6) {
      setPassErrorText("Пароль должен иметь не менее 6-ти символов")
      setIsPassValid(false);
    } else {
      setIsPassValid(true)
    }
  };

  const validateConfirmPassword = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsConfirmassValid(undefined);

    if (value === '') return;

    if(value !== password) {
      setIsConfirmPassErrorText("Пароли не совпадают")
      setIsConfirmassValid(false);
    } else {
      setIsConfirmassValid(true)
    }
  };

  const markEmailTouched = () => {
    setIsEmailTouched(true);
  };

  const markPassTouched = () => {
    setIsPassTouched(true);
  };
  
  const markConfirmPassTouched = () => {
    setIsConfirmPassTouched(true);
  };

  return (
    <IonPage>
      <IonLoading duration={0} isOpen={isLoading} />
      <IonHeader> 
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBack} />
          </IonButtons>
          <IonTitle>Регистрация: шаг 3 из 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          className={`${isEmailValid && 'ion-valid'} ${isEmailValid === false && 'ion-invalid'} ${isEmailTouched && 'ion-touched'}`}
          type="email"
          fill="outline"
          label="Email"
          placeholder="Email"
          labelPlacement="floating"
          errorText="Некорректный email"
          onIonInput={(event) => validateEmail(event)}
          onIonBlur={() => markEmailTouched()}
          onIonChange={(e) => setEmail(e.detail.value!)} />
        <br />
        <IonInput
          className={`${isPassValid && 'ion-valid'} ${isPassValid === false && 'ion-invalid'} ${isPassTouched && 'ion-touched'}`}
          type="password"
          fill="outline"
          label="Пароль"
          placeholder="Пароль"
          labelPlacement="floating"
          errorText={`${isPassErrorText}`}
          helperText="Не менее 6-ти символов"
          onIonInput={(event) => validatePassword(event)}
          onIonBlur={() => markPassTouched()}
          onIonChange={(e) => setPassword(e.detail.value!)} />
        <br />
        <IonInput
          className={`${isConfirmPassValid && 'ion-valid'} ${isConfirmPassValid === false && 'ion-invalid'} ${isConfirmPassTouched && 'ion-touched'}`}
          type="password"
          fill="outline"
          label="Потвердите пароль"
          placeholder="Потвердите пароль"
          labelPlacement="floating"
          errorText={`${isConfirmPassErrorText}`}
          onIonInput={(e) => validateConfirmPassword(e)}
          onIonBlur={() => markConfirmPassTouched()}
          onIonChange={(e) => setConfirmPassword(e.detail.value!)} />
        </IonContent>

        <IonButton className="ion-padding" size="large" expand="full" onClick={handleRegistration}>Готово</IonButton>
    </IonPage>
  );
};

export default Registration3;