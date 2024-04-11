import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonModal, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './CustomerProfile.css';
import { useHistory } from 'react-router-dom';
import { closeOutline, pencil } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { getUserData } from '../services/userData';
import LogoutButton from '../components/LogoutButton';
import Slides from '../services/Slides';

const CustomerProfile: React.FC = () => {

  const myInfomodal = useRef<HTMLIonModalElement>(null);
  const ratingModal = useRef<HTMLIonModalElement>(null);
  const statusModal = useRef<HTMLIonModalElement>(null);

  const [userName, setUserName] = useState('')
  const [surname, setSurname] = useState('')
  const [patronyc, setPatronyc] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const input = useRef<HTMLIonInputElement>(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const redirectToEditProfile = () => {
    myInfomodal.current?.dismiss()
    history.push('/edit_customer_profile', { surname, userName, patronyc });
  }

  const fillData = async() => {
    const userData = await getUserData()

    console.log('userData', userData)

    setUserName(userData.name)
    setSurname(userData.surname)
    setPatronyc(userData.patronyc)
    setPhone(userData.phone)
    setEmail(userData.email)
  }

  useEffect(() => {
    fillData()
  }, [])

  return (
    <IonPage>
      {!localStorage.closed_slider && <Slides />}   
      <IonLoading duration={0} isOpen={isLoading} />
      <IonContent>
        <div className="ion-padding">
          <div className='main_profile_name'>{userName}</div>
          <small>{phone}</small>
        </div>
        <IonList lines="full">
          <IonItem button id="open-my_info_modal">
            <IonLabel>Личные данные</IonLabel>
          </IonItem>
          <IonItem button routerLink='/estimates'>
            <IonLabel>Мои сметы</IonLabel>
          </IonItem>
          <IonItem button routerLink='/object_addresses'>
            <IonLabel>Адреса объектов</IonLabel>
          </IonItem>
          <IonItem button routerLink='/feedback'>
            <IonLabel>Служба поддержки</IonLabel>
          </IonItem>
        </IonList>

        <IonModal ref={myInfomodal} trigger="open-my_info_modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => myInfomodal.current?.dismiss()}>
                  <IonIcon icon={closeOutline} size='large' />
                </IonButton>
              </IonButtons>
              <IonTitle>Личные данные</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={redirectToEditProfile}>
                  <IonIcon icon={pencil} color="primary" size='large' />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding-vertical">
            <IonItem>
              <IonLabel>Фамилия</IonLabel>
              <IonNote slot="end">{surname}</IonNote>
            </IonItem>
            <IonItem>
              <IonLabel>Имя</IonLabel>
              <IonNote slot="end">{userName}</IonNote>
            </IonItem>
            <IonItem>
              <IonLabel>Отчество</IonLabel>
              <IonNote slot="end">{patronyc}</IonNote>
            </IonItem>
            <IonItem>
              <IonLabel>Номер телефона</IonLabel>
              <IonNote slot="end">{phone}</IonNote>
            </IonItem>
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonNote slot="end">{email}</IonNote>
            </IonItem>
          </IonContent>

          <IonButton onClick={redirectToEditProfile} slot="fixed" className="ion-padding" fill='outline'>Редактировать</IonButton>
        </IonModal>
        
      </IonContent>

      <LogoutButton />
    </IonPage>
  );
};

export default CustomerProfile;
