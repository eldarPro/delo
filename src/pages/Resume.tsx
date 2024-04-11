import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonLoading, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './MasterProfile.css';
import { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import { chevronBack, pencil } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { getResume } from '../services/getResume';

const Resume: React.FC = () => {

  const [isLoading, setLoading] = useState<boolean>(true);

  const [specialization, setSpecialization] = useState<string>('');
  const [workExperience, setWorkExperience] = useState<number>();
  const [workByAgreement, setWorkByAgreement] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  const history = useHistory();

  const redirectToEditResume = () => {
    history.push('/edit_resume');
  }

  const fillData = async() => {
    const resumeData = await getResume()

    setSpecialization(resumeData.specialization)
    setWorkExperience(resumeData.workExperience)
    setWorkByAgreement(resumeData.workByAgreement)
    setDescription(resumeData.description)

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
          <IonTitle>Мое резюме</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={redirectToEditResume}>
              <IonIcon icon={pencil} color="primary" size='large' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding-vertical'>
        <IonItem>
          <IonLabel>Специальность</IonLabel>
          <IonNote slot="end">{specialization}</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>Стаж работы</IonLabel>
          <IonNote slot="end">{workExperience} месяцев</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>Работает по договору</IonLabel>
          <IonNote slot="end">{workByAgreement ? 'Да' : 'Нет'}</IonNote>
        </IonItem>
        <IonItem>
          <IonLabel>Описание о себе</IonLabel>
          <IonNote slot="end">{description}</IonNote>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Resume;
