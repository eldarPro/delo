import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { GeolocationControl, Map, Placemark, SearchControl, YMaps } from '@pbe/react-yandex-maps';
import { addDoc, collection, doc } from 'firebase/firestore';
import { addOutline, chevronBack } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import db from '../firebaseConfig';
import './NewObjectAddress.css';
import { getUserUID } from '../services/userData';
import { useHistory } from 'react-router';

const NewObjectAddress: React.FC = () => {

  const [isLoading, setLoading] = useState<boolean>(false);

  const [address, setAddress] = useState([]);
  const [coords, setCoords] = useState([]);
  const [useYmaps, setUseYmaps] = useState();

  const history = useHistory()
  const navigation = useIonRouter()

  const handleMapClick = (e: any) => {
    const objectCoords = e.get('coords');
    console.log('coords', e)
    getAddress(objectCoords)
  };

  const getAddress = async (objectCoords: any) => {
    setCoords(objectCoords)
    // useYmaps.geocode(objectCoords).then((res: any) => {
    //   const firstGeoObject = res.geoObjects.get(0);
    //   const address = firstGeoObject.getAddressLine();
    //   setAddress(address);
    // });
  };

  const geocode = (ymaps: any) => {
    setUseYmaps(ymaps) 
  }

  const createAddress = async() => {
    
    const userUID = getUserUID()

    const addressData = {
      userUID: userUID,
      coords: coords,
      address: address
    }

    console.log(addressData)

    try {
      const docRef = await addDoc(collection(db, "object_addresses"), addressData);
      console.log("Document written with ID: ", docRef.id);
      //history.push('/object_addresses')
      navigation.push('/object_addresses', 'back', 'push')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
   
  }, [])

  return (
    <IonPage>
      <IonLoading duration={0} isOpen={isLoading} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBack} />
          </IonButtons>
          <IonTitle>Новый адрес</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!coords.length ? (
          <div className='ion-padding'>Выберите адрес на карте</div>
        ) : (
          <div className='create_elements_block ion-padding'>
            <strong>{address}</strong>
            <IonButton onClick={createAddress}>Добавить</IonButton>
          </div>
        )}
      <YMaps 
        query={{ apikey: '57398362-80f4-4fe3-a697-4fbd3ceb320c'}}>
        <Map
          onLoad={(ymaps:any) => geocode(ymaps)}
          defaultState={{
            center: [55.75, 37.57],
            zoom: 9,
            controls: ["fullscreenControl"],
          }}
          onClick={handleMapClick}
          width='100%'
          height='100%'
          modules={["control.FullscreenControl", 'geocode']}
        > 
          {coords.length > 0 && <Placemark geometry={coords} />}
          <GeolocationControl options={{ float: "left" }} />
          <SearchControl options={{ float: "right" }} />
        </Map>        
      </YMaps>;
      </IonContent>
    </IonPage>
  );
};

export default NewObjectAddress;
