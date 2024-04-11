import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline, chevronBack } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getObjectAddresses } from '../services/getObjectAddresses';
import EmptyText from '../components/EmptyText';

const ObjectAddress: React.FC = () => {

  const [isLoading, setLoading] = useState<boolean>(true);

  const [addresses, setAddresses] = useState<any[]>([])

  const fillData = async() => {
    const addressesData = await getObjectAddresses()
    console.log('addressesData', addressesData)
    if(addressesData.length) setAddresses(addressesData)
    setLoading(false)
  }

  useEffect(() => {
    fillData()
  }, [])

  return (
    <IonPage>
      <IonLoading duration={0} isOpen={isLoading} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBack} />
          </IonButtons>
          <IonTitle>Адреса объектов</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} routerLink='/object_addresses/new'>
              <IonIcon icon={addOutline} color="primary" size='large' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding-vertical'>
       {!addresses.length ? (
          <>
            <EmptyText text='Нет адресов для отображения' />
            <IonButton expand="block" style={{margin: 'auto', width: '250px'}} routerLink='/object_addresses/new'>Создать новый адрес</IonButton>
          </>
        ) : (
        <IonList>
          {addresses.map((item, index) => (
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

export default ObjectAddress;
