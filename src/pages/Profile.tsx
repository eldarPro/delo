import { useEffect, useState } from 'react';
import { getUserData, getUserType } from '../services/userData';
import MasterProfile from './MasterProfile';
import CustomerProfile from './CustomerProfile';
import { IonLoading } from '@ionic/react';

const Profile: React.FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userType, setUserType] = useState('')
  console.log('page profile')

  useEffect(() => {
    setIsLoading(true)
    const userType = getUserType()
    setUserType(userType)
    setIsLoading(false)
  }, [])

  return (
    <>
      <IonLoading duration={0} isOpen={isLoading} />
      {userType === 'master' ? <MasterProfile /> : <CustomerProfile /> }
    </>
  );
};

export default Profile;
