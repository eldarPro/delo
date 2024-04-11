import { IonContent, IonPage, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonFooter, IonFab, useIonToast, IonBackButton, IonButtons } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

const Registration2: React.FC = () => {
  const [typeUser, setTypeUser] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [surnameErrorText, setSurnameErrorText] = useState('');
  const [nameErrorText, setNameErrorText] = useState('');

  interface RouteParams {
    typeUser: string;
  }

  const location = useLocation<RouteParams>()

  const history = useHistory();

  const [present] = useIonToast();

  const presentToast = (text: string) => {
    present({
      message: text,
      duration: 1500,
      position: 'top',
      color: 'danger'
    });
  };

  const [phoneValid, setPhoneValid] = useState<boolean>();
  const [phoneErrorText, setPhoneErrorText] = useState('');

  const validatePhone = (ev: Event) => {

  };

  function goToReg3() {

    let validate = false

    if(!surname.length || !name.length || !phone.length) {
      presentToast('Заполните все поля!')
      return false
    }

    if(surname.length < 3) {
      setSurnameErrorText('Фамилия должна иметь больше 2-x символов')
      validate = false
    } else {
      setSurnameErrorText('')
      validate = true
    }

    if(name.length < 3) {
      setNameErrorText('Имя должна иметь больше 2-x символов') 
      validate = false
    } else {
      setNameErrorText('')
      validate = true
    }

    if(validate) {
      history.push('/reg3', { typeUser: location.state.typeUser, surname, name, phone })
    }

  }

  return (
    <IonPage>
      <IonHeader> 
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBack} />
          </IonButtons>
          <IonTitle>Регистрация: шаг 2 из 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          className={`${surnameErrorText.length && 'ion-invalid ion-touched'}`}
          fill="outline"
          label="Фамилия"
          placeholder="Фамилия"
          labelPlacement="floating" 
          errorText={`${surnameErrorText}`}
          onIonChange={(e) => setSurname(e.detail.value!)} />
          <br />
        <IonInput
          className={`${nameErrorText.length && 'ion-invalid ion-touched'}`}
          fill="outline"
          label="Имя"
          placeholder="Имя"
          labelPlacement="floating"
          errorText={`${nameErrorText}`}
          onIonChange={(e) => setName(e.detail.value!)} />
        <br />
        <IonInput
          fill="outline"
          label="Номер телефона"
          placeholder="Номер телефона"
          labelPlacement="floating"
          onIonChange={(e) => setPhone(e.detail.value!)} />
        </IonContent>

        <IonButton className="ion-padding" size="large" expand="full" onClick={goToReg3}>Далее</IonButton>
    </IonPage>
  );
};

export default Registration2;