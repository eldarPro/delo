import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Orders.css';
import { useEffect, useState } from 'react';
import { getUserData } from '../services/userData';

const CallMeasurer: React.FC = () => {

  const [phone, setPhone] = useState('')
  const [isSend, setIsSend] = useState(false)

  const fillData = async() => {
    const userData = await getUserData()
    setPhone(userData.phone) 
  }

  const sendData = async() => {
    if(!phone.length) return
    setIsSend(true)
  }

  useEffect(() => {
    fillData()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Вызов замерщика</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        {!isSend ?
          (<>
            <br />
            <IonInput
              fill="outline"
              label="Номер телефона для связи" 
              value={phone}
              type="number" 
              placeholder="Номер телефона"
              labelPlacement="floating"
              onIonChange={(e) => setPhone(e.detail.value!)} />
            <br />
            <IonButton onClick={sendData} expand="full">Отправить заявку</IonButton>
          </>
          ) : (
            <div className='ion-padding'>
              <center>Заявка успешно отправлена!</center>
              <br />
              <center>Ждите звонка замерщика!</center>
            </div>
          )}
      </IonContent>
      
    </IonPage>
  );
};

export default CallMeasurer;
