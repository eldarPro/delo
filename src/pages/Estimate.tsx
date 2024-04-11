import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getUserFeedbacks } from '../services/getUserFeedbacks';
import { getEstimates } from '../services/getEstimates';
import EmptyText from '../components/EmptyText';

const Estimate: React.FC = () => {

  const [isLoading, setLoading] = useState<boolean>(true);

  const [estimates, setEstimates] = useState([])

  const fillData = async() => {
    const estimatesData = await getEstimates()
    console.log('estimatesData', estimatesData)
    if(estimatesData.length) setEstimates(estimatesData)
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
          <IonTitle>Мои сметы</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} routerLink='/estimates/new'>
              <IonIcon icon={addOutline} color="primary" size='large' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding-vertical'>
        {!estimates.length ? (
          <>
            <EmptyText text='Нет смет для отображения' />
            <IonButton expand="block" style={{margin: 'auto', width: '250px'}} routerLink='/estimates/new'>Создать новую смету</IonButton>
          </>
          ) : (
          <IonList>
            {estimates.map((item, index) => (
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

export default Estimate;
