import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Orders.css';
import { useEffect, useState } from 'react';
import EmptyText from '../components/EmptyText';
import { getCustomerOrders } from '../services/getCustomerOrders';
import { addOutline } from 'ionicons/icons';
import Stories from '../services/Slides';
import Slides from '../services/Slides';

const CustomerOrders: React.FC = () => {

  const [isLoading, setLoading] = useState<boolean>(true);

  const [orders, setOrders] = useState([])

  const fillData = async() => {
    const ordersData = await getCustomerOrders()
    console.log('ordersData', ordersData)
    if(ordersData.length) setOrders(ordersData)
    setLoading(false)
  }

  useEffect(() => {
    fillData()
  }, [])

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonTitle>Мои заказы</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} routerLink='/customer_orders/new'>
              <IonIcon icon={addOutline} color="primary" size='large' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!orders.length ? (
          <>
          <EmptyText text='Нет заказов для отображения' />
          <IonButton expand="block" style={{margin: 'auto', width: '250px'}} routerLink='/customer_orders/new'>Создать новый заказ</IonButton>
          </>
        ) : (
        <IonList>
          {orders.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>{item.address}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CustomerOrders;
