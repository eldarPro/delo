import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRadio, IonRadioGroup, IonRouterLink, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { doc, updateDoc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { getUserUID } from '../services/userData';
import { Link } from 'react-router-dom';
import './NewCustomerOrder.css';
import { getObjectAddresses } from '../services/getObjectAddresses';
import { getEstimates } from '../services/getEstimates';

const NewCustomerOrder: React.FC = () => {

  interface RouteParams {
    surname: string;
    userName: string;
    patronyc: string;
    address: string;
  }

  const location = useLocation<RouteParams>()

  const [addresses, setAddresses] = useState<any[]>([])
  const [estimates, setEstimates] = useState<any[]>([])
  const [description, setDescription] = useState<string>('')
  const [availableDays, setAvailableDays] = useState<boolean>(false)

  const [surname, setSurname] = useState(location.state?.surname || '')
  const [name, setName] = useState(location.state?.userName || '')
  const [patronyc, setPatronyc] = useState(location.state?.patronyc || '')
  const [address, setAddress] = useState(location.state?.address || '')

  const [surnameErrorText, setSurnameErrorText] = useState('')
  const [nameErrorText, setNameErrorText] = useState('')
  const [patronycErrorText, setPatronycErrorText] = useState('')
  const [addressErrorText, setAddressErrorText] = useState('')

  const [isLoading, setLoading] = useState<boolean>(true)

  const [present] = useIonToast()

  const history = useHistory()

  const presentToast = (text: string) => {
    present({
      message: text,
      duration: 1500,
      position: 'top',
      color: 'danger'
    });
  }

  const createOrder = async() => {
    setSurnameErrorText('')
    setNameErrorText('')
    setPatronycErrorText('')

    let validate = false

    if(!surname.length || !name.length || !address.length) {
      presentToast('Заполните обязательные поля!')
      return false
    }

    if(surname.length < 3) {
      setSurnameErrorText('Фамилия должна иметь больше 2-x символов')
      validate = false
    } else {
      validate = true
    }

    if(name.length < 3) {
      setNameErrorText('Имя должна иметь больше 2-x символов') 
      validate = false
    } else {
      validate = true
    }

    if(patronycErrorText.length) {
      if(patronycErrorText.length < 3) {
        setPatronycErrorText('Отчество должна иметь больше 2-x символов') 
        validate = false
      } else {
        validate = true
      }
    }
    
    if(!validate) return false

    const uid = getUserUID()

    const updateData = {
      surname: surname,
      name: name,
      patronyc: patronyc,
      address: address
    }

    console.log('start save profile data', updateData)

    await updateDoc(doc(db, 'users', uid), updateData);

    console.log('save profile data')

    history.push('/profile');
  }

  const fillData = async() => {
    const addressesData = await getObjectAddresses()
    if(addressesData.length) setAddresses(addressesData)
    console.log('addressesData', addressesData)

    const estimatesData = await getEstimates()
    if(estimatesData.length) setEstimates(estimatesData)
    console.log('addressesData', addressesData)

    setLoading(false)
  }

  const handleAvailableDays = (value: string) => {
    setAvailableDays((value === 'days'))
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
          <IonTitle>Новый заказ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding-vertical'>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Смета *</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonSelect cancelText="Отменить" interface="action-sheet" placeholder="- Выберите смету -">
                {estimates.map((item, index) => (
                  <IonSelectOption key={index} value={item.title}>{item.title}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem lines='none'>
              <Link slot='end' to='/estimates/new' className='right_link'>+ Новая смета</Link>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Адрес объекта *</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonSelect cancelText="Отменить" interface="action-sheet" placeholder="- Выберите адрес -">
                {addresses.map((item, index) => (
                  <IonSelectOption key={index} value={item.address}>{item.address}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem lines='none'>
              <Link slot='end' to='object_addresses/new' className='right_link'>+ Новый адрес</Link>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Доступные дни для заказа</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonRadioGroup value="all" onIonChange={(e) => handleAvailableDays(e.detail.value!)}>
              <IonRadio value="all" labelPlacement="end">Любой день</IonRadio>
              <br />
              <br />
              <IonRadio value="days" labelPlacement="end">Выбрать из каленьдаря</IonRadio>
            </IonRadioGroup>
            {availableDays && (
              <>
                <br />
                <br />
                <IonDatetime presentation="date" multiple={true}></IonDatetime>
              </>
            )}
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Примечания к заказу</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonTextarea 
                autoGrow={true}
                onIonChange={(e) => setDescription(e.detail.value!)}
                placeholder="Ваши комментарии к заказу" />
            </IonItem>
          </IonCardContent>
        </IonCard>
        
        <IonButton className="ion-padding" size='large' expand='full' disabled={true} onClick={createOrder}>Готово</IonButton>
      </IonContent>
      
    </IonPage>
  );
};

export default NewCustomerOrder;
