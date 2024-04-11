import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/RatingIcon';
import './Orders.css';
import { useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebaseConfig';
import LogoutButton from '../components/LogoutButton';
import Stories from '../services/Slides';
import EmptyText from '../components/EmptyText';

const Orders: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSegment value="all">
            <IonSegmentButton value="all">
              <IonLabel>Все заказы</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="favorites">
              <IonLabel>Мои заказы</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <EmptyText text='Пока пусто' />
      </IonContent>
    </IonPage>
  );
};

export default Orders;
