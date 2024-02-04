import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Orders.css';

const Orders: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Заказы</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Заказы</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Страница заказов" />
      </IonContent>
    </IonPage>
  );
};

export default Orders;
