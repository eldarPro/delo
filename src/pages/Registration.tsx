import { IonContent, IonPage, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonFooter, IonFab, useIonToast, IonCardContent, IonCard, IonItem, IonThumbnail, IonLabel, IonImg, IonBackButton, IonButtons } from '@ionic/react';
import { useState } from 'react';
import './Registration.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useHistory } from 'react-router-dom';
import { chevronBack } from 'ionicons/icons';

const Registration: React.FC = () => {
 
  const history = useHistory();

  const goToReg2 = (typeUser: string) => {
    history.push('/reg2', { typeUser: typeUser })
  };

  return (
    <IonPage>
      <IonHeader> 
        <IonToolbar>
          <IonTitle>Регистрация: шаг 1 из 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-vertical">
        <h2 className="ion-padding">Кто вы?</h2>
        <IonCard onClick={() => goToReg2('master')}>
          <IonCardContent>
            <IonItem lines="none">
              <IonThumbnail slot="start" className='reg_type_img'>
                <IonImg src='https://sun9-67.userapi.com/impf/c849032/v849032559/184f8b/wYjSjM-q17A.jpg?size=684x684&quality=96&sign=c7ddd5e74c638021a06c0f756b63eb92&c_uniq_tag=xe0jrHIIXNxfEo5XJl0Gov76KRN1-RkV506icPp93qM&type=album' alt="Заказчик" />
              </IonThumbnail>
              <IonLabel className='reg_type_title'>Я - мастер</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <br />
        <IonCard onClick={() => goToReg2('customer')}>
          <IonCardContent>
            <IonItem lines="none">
              <IonThumbnail slot="start" className='reg_type_img'>
                <IonImg src='https://sun1-55.userapi.com/s/v1/ig1/WbpfExz_fvtU7HuIcbxQkvwWxmagTJKWW2lnaqWhJX314qBj3JnsvQMtZQleSL-I91V_ZT_r.jpg?size=400x400&quality=96&crop=46,0,1242,1242&ava=1' alt="Заказчик" />
              </IonThumbnail>
              <IonLabel className='reg_type_title'>Я - заказчик</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>

      <div slot="fixed" className="ion-padding-vertical ion-text-center">
        <Link to='/login'>У меня уже есть аккаунт</Link>
      </div>
      <br />
    </IonPage>
  );
};

export default Registration;