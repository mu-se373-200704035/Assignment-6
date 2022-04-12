import { IonButton, IonInput, IonItem, IonLabel, IonList, IonToast } from "@ionic/react";
import React from "react";
import { Redirect } from "react-router";
//style
import "./LoginForm.css";
//context
import UserContext from "../context";

const LoginForm = () => {
    
    const [formData , setFormData] = React.useState({
        username : "",
        password : ""
    })
    const [showToastError, setShowToastError] = React.useState(false);
    const [showToastSuccess, setShowToastSuccess] = React.useState(false);
    const [showToastInvalid, setShowToastInvalid] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const {user, setUser} = React.useContext(UserContext);

    const handleChangeUsername = (newName : string) => {
        setFormData(prevData => {
            return {
                ...prevData,
                username: newName
            }
        });
    }
    const handleChangePassword = (newPassword : string) => {
        setFormData(prevData => {
            return {
                ...prevData,
                password : newPassword
            }
        });
    }
    


    const sendFormData = () => {
        if(formData.username!=="" && formData.password!==""){
            fetch(`http://192.168.1.38:8080/indexlogin.php?username=${formData.username}&password=${formData.password}`)
            .then(res => res.json())
            .then(data => {
                if(data.message!=="Invalid username or password"){
                    setShowToastSuccess(true);
                    setUser(data.user)
                    setRedirect(false);
                    setRedirect(true);
                }else{
                    setShowToastError(true);
                }
                console.log(data)
            })
            .catch(e=>console.log("ERROR", e))
        }
        else{
            setShowToastInvalid(true);
        }
    }

    return(
        <form className="form">
            <IonList className="form-list">
                <IonItem>
                    <IonLabel position="floating">username</IonLabel>
                    <IonInput name="username" value={formData.username}
                    onIonChange={(event)=>handleChangeUsername(event.detail.value!)}></IonInput>
                </IonItem>                       
                <IonItem>
                    <IonLabel position="floating">password</IonLabel>
                    <IonInput name="password" type="password" value={formData.password}
                    onIonChange={(event)=>handleChangePassword(event.detail.value!)}></IonInput>
                </IonItem>       
            </IonList>

            <IonButton className="register-btn" onClick={sendFormData}>login</IonButton>
            
            <IonButton className="goto-login-btn" href="/register" fill="clear">I don't have an acount</IonButton>


            <IonToast
                isOpen={showToastError}
                onDidDismiss={() => setShowToastError(false)}
                message="Wrong credientials"
                duration={3000}
            />
            <IonToast
                isOpen={showToastSuccess}
                onDidDismiss={() => setShowToastSuccess(false)}
                message="Logged in successfully!"
                duration={3000}
            />
            <IonToast
                isOpen={showToastInvalid}
                onDidDismiss={() => setShowToastInvalid(false)}
                message="Form is invalid!"
                duration={3000}
            />
            {redirect?(<Redirect push to="/home"/>) : null}
        </form>
    )
}
export default LoginForm;