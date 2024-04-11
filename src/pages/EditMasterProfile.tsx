import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { doc, updateDoc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { getUserUID } from '../services/userData';

const EditMasterProfile: React.FC = () => {

  interface RouteParams {
    surname: string;
    userName: string;
    patronyc: string;
    address: string;
  }

  const location = useLocation<RouteParams>()

  const [surname, setSurname] = useState(location.state?.surname || '')
  const [name, setName] = useState(location.state?.userName || '')
  const [patronyc, setPatronyc] = useState(location.state?.patronyc || '')
  const [address, setAddress] = useState(location.state?.address || '')

  const [surnameErrorText, setSurnameErrorText] = useState('')
  const [nameErrorText, setNameErrorText] = useState('')
  const [patronycErrorText, setPatronycErrorText] = useState('')
  const [addressErrorText, setAddressErrorText] = useState('')

  const [isLoading, setLoading] = useState<boolean>(false)

  const [present] = useIonToast()

  const history = useHistory()

  const presentToast = (text: string) => {
    present({
      message: text,
      duration: 1500,
      position: 'top',
      color: 'danger'
    });
  }

  const saveData = async() => {
    setSurnameErrorText('')
    setNameErrorText('')
    setPatronycErrorText('')

    let validate = false

    if(!surname.length || !name.length || !address.length) {
      presentToast('Заполните обязательные поля!')
      return false
    }

    if(surname.length < 3) {
      setSurnameErrorText('Фамилия должна иметь больше 2-x символов')
      validate = false
    } else {
      validate = true
    }

    if(name.length < 3) {
      setNameErrorText('Имя должна иметь больше 2-x символов') 
      validate = false
    } else {
      validate = true
    }

    if(patronycErrorText.length) {
      if(patronycErrorText.length < 3) {
        setPatronycErrorText('Отчество должна иметь больше 2-x символов') 
        validate = false
      } else {
        validate = true
      }
    }
    
    if(!validate) return false

    const uid = getUserUID()

    const updateData = {
      surname: surname,
      name: name,
      patronyc: patronyc,
      address: address
    }

    console.log('start save profile data', updateData)

    await updateDoc(doc(db, 'users', uid), updateData);

    console.log('save profile data')

    history.push('/profile');
  }

  return (
    <IonPage>
      <IonLoading duration={0} isOpen={isLoading} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBack} />
          </IonButtons>
          <IonTitle>Редактирование</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
				<IonInput
          className={`${surnameErrorText.length && 'ion-invalid ion-touched'}`}
          fill="outline"
          label="Фамилия *"
          value={surname}
          placeholder="Фамилия *"
          labelPlacement="floating"
          errorText={`${surnameErrorText}`}
          onIonChange={(e) => setSurname(e.detail.value!)} />
					<br />
				<IonInput
          className={`${nameErrorText.length && 'ion-invalid ion-touched'}`}
          fill="outline"
          label="Имя *"
          value={name}
          placeholder="Имя *"
          labelPlacement="floating"
          errorText={`${nameErrorText}`}
          onIonChange={(e) => setName(e.detail.value!)} />
				<br />
				<IonInput
          className={`${patronycErrorText.length && 'ion-invalid ion-touched'}`}
          fill="outline"
          label="Отчество"
          value={patronyc}
          placeholder="Отчество"
          labelPlacement="floating"
          errorText={`${patronycErrorText}`}
          onIonChange={(e) => setPatronyc(e.detail.value!)} />
        <br />
        <IonInput
          className={`${addressErrorText.length && 'ion-invalid ion-touched'}`}
          fill="outline"
          label="Адрес проживания *"
          value={address}
          placeholder="Адрес проживания *"
          labelPlacement="floating"
          errorText={`${addressErrorText}`}
          onIonChange={(e) => setAddress(e.detail.value!)} />
				<br />
      </IonContent>

      <IonButton className="ion-padding" slot="fixed" onClick={saveData}>Сохранить</IonButton>
    </IonPage>
  );
};

export default EditMasterProfile;
