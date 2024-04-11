import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonNote, IonPage, IonTextarea, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import './MasterProfile.css';
import { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import { chevronBack, pencil } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { getUserData, getUserUID } from '../services/userData';
import db from '../firebaseConfig';
import { addDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getResume } from '../services/getResume';

const EditResume: React.FC = () => {

  const [isLoading, setLsoading] = useState<boolean>(true);

  const [isNewResume, setIsNewResume] = useState<boolean>(true);

  const [specialization, setSpecialization] = useState<string>('');
  const [workExperience, setWorkExperience] = useState<number>();
  const [workByAgreement, setWorkByAgreement] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  
  const history = useHistory();

  const [present] = useIonToast()

  const presentToast = (text: string) => {
    present({
      message: text,
      duration: 1500,
      position: 'top',
      color: 'danger'
    });
  }

  const saveData = async() => {
    
    if(!specialization.length || !workExperience || !description.length) {
      presentToast('Заполните обязательные поля!')
      return false
    }

    const uid = getUserUID()

    const updateData = {
      specialization: specialization,
      workExperience: workExperience,
      workByAgreement: workByAgreement,
      description: description
    }

    console.log('start save resume data', updateData)

    if(isNewResume) {
      await setDoc(doc(db, 'resumes', uid), updateData);
      await updateDoc(doc(db, 'users', uid), { status: 2 });
    } else { 
      await updateDoc(doc(db, 'resumes', uid), updateData);
    }

    console.log('save resume data')

    history.push('/profile');
  }

  const fillData = async() => {
    const resumeData = await getResume()
    
    if(resumeData) {
      setIsNewResume(false)
      setSpecialization(resumeData.specialization)
      setWorkExperience(resumeData.workExperience)
      setWorkByAgreement(resumeData.workByAgreement)
      setDescription(resumeData.description)
    }
    
    setLsoading(false)
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
          <IonTitle>Резюме</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonInput
          fill="outline"
          label="Специальность *"
          value={specialization}
          placeholder="Например, замерщик"
          labelPlacement="floating"
          onIonChange={(e) => setSpecialization(e.detail.value!)} />
        <br />
        <IonInput 
          fill="outline"
          label="Стаж работы" 
          value={workExperience}
          type="number" 
          placeholder="Укажите количество месяцев"
          labelPlacement="floating"
          onIonChange={(e) => setWorkExperience(parseInt(e.detail.value!))} />
        <br />
        <IonCheckbox 
          checked={workByAgreement}
          onIonChange={(e) => setWorkByAgreement(e.detail.checked)}>Работаете по договору?</IonCheckbox>  
        <br />
        <br />
        <IonTextarea
          autoGrow={true}
          fill="outline"
          label="Расскажите о себе *"
          value={description}
          placeholder="Опишите о себе, чем занимаетесь, какие навыки имеете и т.д."
          labelPlacement="floating"
          onIonChange={(e) => setDescription(e.detail.value!)} />    
      </IonContent>

      <IonButton className="ion-padding" slot="fixed" onClick={saveData}>Сохранить</IonButton>
    </IonPage>
  );
};

export default EditResume;
