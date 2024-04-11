import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonModal, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './MasterProfile.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import RatingIcon from '../components/RatingIcon';
import { getUserData } from '../services/userData';
import LogoutButton from '../components/LogoutButton';
import MasterStatus from '../components/MasterStatus';
import MasterStatusDescription from '../components/MasterStatusDescription';
import { chevronBack, closeOutline, pencil } from 'ionicons/icons';

const MasterProfile: React.FC = () => {

  const myInfomodal = useRef<HTMLIonModalElement>(null);
  const ratingModal = useRef<HTMLIonModalElement>(null);
  const statusModal = useRef<HTMLIonModalElement>(null);

  const [userName, setUserName] = useState('')
  const [surname, setSurname] = useState('')
  const [patronyc, setPatronyc] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [rating, setRating] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState<number>()

  const input = useRef<HTMLIonInputElement>(null);

  const [isLoading, setLoading] = useState<boolean>(true);
  
  const history = useHistory();

  const redirectToEditProfile = () => {
    myInfomodal.current?.dismiss()
    history.push('/edit_master_profile', { surname, userName, patronyc, address });
  }

  const redirectToResume = () => {
    if(status == 1) {
      history.push('/edit_resume');
    } else {
      history.push('/resume');
    }
  }

  const fillData = async() => {
    const userData = await getUserData()

    console.log('userData', userData)

    setSurname(userData.surname)
    setUserName(userData.name)
    setPatronyc(userData.patronyc)
    setPhone(userData.phone)
    setRating(userData.rating)
    setEmail(userData.email)
    setStatus(userData.status)
    setAddress(userData.address)

    setLoading(false)
  }

  useEffect(() => {
    console.log('Процессы на странице Resume перезапущены');
    fillData()
  }, [])

  return (
    <IonPage>
      <IonLoading duration={0} isOpen={isLoading} />
      <IonContent>
        <IonGrid className="ion-padding">
          <IonRow className="ion-justify-content-between">
            <IonCol size="9">
              <div className='main_profile_name'>{userName}</div>
              <small>{phone}</small>
              <br />
              <MasterStatus status={status} />
            </IonCol>
            <IonCol size="3" className='main_profile_rating_block'>
              <RatingIcon />
              <div className='rating_num'>{rating}</div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonList lines="full">
          <IonItem button id="open-my_info_modal">
            <IonLabel>Личные данные</IonLabel>
          </IonItem>
          <IonItem button onClick={redirectToResume}>
            <IonLabel>Резюме</IonLabel>
          </IonItem>
          <IonItem button id="open-status_modal">
            <IonLabel>Статус</IonLabel>
          </IonItem>
          <IonItem button id="open-rating_modal">
            <IonLabel>Рейтинг</IonLabel>
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
              <IonLabel>Адрес проживания</IonLabel>
              <IonNote slot="end">{address}</IonNote>
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
        </IonModal>

        <IonModal ref={ratingModal} trigger="open-rating_modal">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Мой рейтинг</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => ratingModal.current?.dismiss()}>
                  Закрыть
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <div className='rating_modal_header'>
              <RatingIcon />
              <div className='rating_modal_title_block'>
                <div className='rating_title'>Ваш рейтинг:</div>
                <div className='rating_num'>{rating}</div>
              </div>
            </div>
            <br />
            <div>У вас низкий текущий ретинг. Вам нужно набрать больше рейтинга, чтобы заказчики обратили на вас внимание</div>        
            <br />
            <h4>Как формируется рейтинг?</h4>
            <div>Рейтинг формируется из оценок заказчиков ваших выполненных работ. Оценка состоит из 5-ти звездочек.</div>
          </IonContent>

        </IonModal>

        <IonModal ref={statusModal} trigger="open-status_modal">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Мой статус</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => statusModal.current?.dismiss()}>
                  Закрыть
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <div>Ваш статус <MasterStatus className='status_block'  status={status} /></div>
            <br />
            <div><MasterStatusDescription status={status} /></div>        
          </IonContent>

        </IonModal>
        
      </IonContent>

      <LogoutButton />
    </IonPage>
  );
};

export default MasterProfile;
