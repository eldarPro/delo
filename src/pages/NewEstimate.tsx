import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonLoading, IonModal, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline, chevronBack } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { getUserFeedbacks } from '../services/getUserFeedbacks';
import { getEstimates } from '../services/getEstimates';
import EmptyText from '../components/EmptyText';
import { Link } from 'react-router-dom';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

const NewEstimate: React.FC = () => {

  const [items, setItems] = useState([])

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  function confirm(e) {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  useEffect(() => {
    
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBack} />
          </IonButtons>
          <IonTitle>Новая смета</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding-vertical'>
        <IonItem lines='none'>
          <IonButton strong={true} id="open-modal">+ Новая позиция</IonButton>
        </IonItem>

        <IonModal ref={modal} trigger="open-modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>X</IonButton>
              </IonButtons>
              <IonTitle>Новая позиция</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding-vertical">
            <IonItem>
              <IonInput
                label="Название"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Например, монтаж провода"
              />
            </IonItem>
            <br />
            <IonItem>
              <IonSelect cancelText="Отменить" interface="action-sheet" label="Единица измерения" labelPlacement="stacked" placeholder='Выберите из списка'>
                <IonSelectOption key={1} value='m2'>квадратный метр</IonSelectOption>
                <IonSelectOption key={2} value='pm'>погонный метр</IonSelectOption>
                <IonSelectOption key={3} value='cnt'>штука</IonSelectOption>
              </IonSelect>
            </IonItem>
            <br />
            <IonItem>
              <IonInput
                label="Количество"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Например, 3"
              />
            </IonItem>
            <br />
            <IonItem>
              <IonInput
                label="Цена за материал"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Например, 1500"
              />
            </IonItem>
              <br />
              <IonItem>
              <IonInput
                label="Цена за работу"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Например, 300"
              />
              </IonItem>
              <IonButton  expand='full' className='ion-padding'>Добавить</IonButton>
             
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default NewEstimate;
