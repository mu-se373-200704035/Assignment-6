import './ExploreContainer.css';
import UserContext from "../context";
import { IonButton, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';

const ExploreContainer: React.FC = () => {
  
  const { user,setUser } = React.useContext(UserContext);

  if(!user){
    return (
        <div>
          <Redirect push to="/login"/>
        </div>
      )
  }
  return (
    <div className="container">
      <section className="profile">
        <h2>Profile</h2>
        <IonList>
          <IonItem>
            <IonLabel>id</IonLabel>
            <IonText>{user.id}</IonText>
          </IonItem>
          <IonItem>
            <IonLabel>username</IonLabel>
            <IonText>{user.username}</IonText>
          </IonItem>
          <IonItem>
            <IonLabel>email</IonLabel>
            <IonText>{user.email}</IonText>
          </IonItem>
          <IonItem>
            <IonLabel>gender</IonLabel>
            <IonText>{user.gender}</IonText>
          </IonItem>
        </IonList>
        <IonButton onClick={()=>setUser(null)}>Log Out</IonButton>
      </section>
    </div>
  );
};

export default ExploreContainer;
