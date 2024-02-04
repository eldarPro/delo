import { IonContent, IonPage, IonInput, IonButton } from '@ionic/react';
import { useAuth } from '../components/AuthContext';
import { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth()

  const handleLogin = () => {
    // Здесь вы можете добавить логику для проверки учетных данных пользователя
    // Например, вызов метода login из AuthContext
    login(username, password);
  };

  return (
    <IonPage>
      <IonContent>
        <IonInput placeholder="Никнейм" onIonChange={(e) => setUsername(e.detail.value!)} />
        <IonInput placeholder="Пароль" type="password" onIonChange={(e) => setPassword(e.detail.value!)} />
        <IonButton onClick={handleLogin}>Войти</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;