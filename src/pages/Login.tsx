import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LoginForm from '../components/LoginForm';
import './Login.css';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LoginForm />
      </IonContent>
    </IonPage>
  );
};

export default Login;
