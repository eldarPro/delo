import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getUserFeedbacks } from '../services/getUserFeedbacks';

const Feedback: React.FC = () => {

  const [isLoading, setLoading] = useState<boolean>(false);

  const [feedbacks, setFeedbacks] = useState([])
  const [message, setMessage] = useState('')

  const sendData = () => {

  }

  const fillData = async() => {
    // const feedbacksData = await getUserFeedbacks()
    // console.log('feedbacksData', feedbacksData)
    // if(feedbacksData.length) setFeedbacks(feedbacksData)
    // setLoading(false)
  }

  useEffect(() => {
    fillData()
  }, [])

  return (
    <IonPage>
      <IonLoading duration={0} isOpen={isLoading} />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Служба поддержки</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <br />
        <IonTextarea
          fill="outline"
          autoGrow={true}
          label="Ваш вопрос" 
          placeholder="Пишите что вы хотите узнать"
          labelPlacement="floating"
          onIonChange={(e) => setMessage(e.detail.value!)} />
        <br />
        <IonButton onClick={sendData} expand="full">Отправить</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Feedback;
