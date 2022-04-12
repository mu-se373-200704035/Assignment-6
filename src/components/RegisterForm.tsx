import React from "react";
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonToast } from "@ionic/react";
//style
import "./RegisterForm.css";
import { Redirect } from "react-router";

const RegisterForm = () => {
    
    const [formData , setFormData] = React.useState({
        username : "",
        email :"",
        password : "",
        gender : ""
    })
    const [confirm, setConfirm] = React.useState("");
    const [showToastError, setShowToastError] = React.useState(false);
    const [showToastSuccess, setShowToastSuccess] = React.useState(false);
    const [showToastInUse, setShowToastInUse] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    
    const handleChangeUsername = (newName : string) => {
        setFormData(prevData => {
            return {
                ...prevData,
                username: newName
            }
        });
    }
    const handleChangeEmail = (newEmail : string) => {
        setFormData(prevData => {
            return {
                ...prevData,
                email : newEmail
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
    const handleChangeConfirm = (newConfirm : string) => {
        setConfirm(newConfirm);
    }
    const handleChangeGender = (newGender : string) => {
        setFormData(prevData => {
            return {
                ...prevData,
                gender : newGender
            }
        });
    }
    const sendFormData = () => {
        if(formData.password===confirm && formData.username!=="" && formData.password!==""&&formData.email!==""&&formData.gender!==""&&formData.email.includes("@")){
            fetch(`http://192.168.1.38:8080/indexregister.php?username=${formData.username}&email=${formData.email}&password=${formData.password}&gender=${formData.gender}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.message==="User registered successfully"){
                    setShowToastSuccess(true);
                    setRedirect(true);
                }else{
                    setShowToastInUse(true);
                }
            })
            .catch(e=>console.log("ERROR", e))
        }
        else{
            setShowToastError(true);
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
                    <IonLabel position="floating">email</IonLabel>
                    <IonInput name="email" type="email" value={formData.email}
                    onIonChange={(event)=>handleChangeEmail(event.detail.value!)}></IonInput>
                </IonItem>            
                <IonItem>
                    <IonLabel position="floating">password</IonLabel>
                    <IonInput name="password" type="password" value={formData.password}
                    onIonChange={(event)=>handleChangePassword(event.detail.value!)}></IonInput>
                </IonItem>            
                <IonItem>
                    <IonLabel position="floating">confirm</IonLabel>
                    <IonInput name="confirm" type="password" value={confirm}
                    onIonChange={(event)=>handleChangeConfirm(event.detail.value!)}></IonInput>
                </IonItem>         
                <IonItem>
                    <IonLabel position="floating">gender</IonLabel>
                    <IonInput name="gender" value={formData.gender}
                    onIonChange={(event)=>handleChangeGender(event.detail.value!)}></IonInput>
                </IonItem>         
            </IonList>
            
            <IonButton className="register-btn" onClick={sendFormData}>Register</IonButton>
            
            <IonButton className="goto-login-btn" href="/login" fill="clear">I have an acount</IonButton>


            <IonToast
                isOpen={showToastError}
                onDidDismiss={() => setShowToastError(false)}
                message="Form is not valid"
                duration={3000}
            />
            <IonToast
                isOpen={showToastSuccess}
                onDidDismiss={() => setShowToastSuccess(false)}
                message="Registered Successfully!!"
                duration={3000}
            />
            <IonToast
                isOpen={showToastInUse}
                onDidDismiss={() => setShowToastInUse(false)}
                message="Username may be in use!"
                duration={3000}
            />
            {redirect?(<Redirect push to="/login"/>) : null}
        </form>
    )

}

export default RegisterForm;