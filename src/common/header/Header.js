import React, { useState } from "react";
import logo from '../../assets/logo.jpeg';
import "./Header.css";
import {Button} from "@material-ui/core";
import Login from "../../screens/login/Login";

export default function Header(props){
    const [openModal, setIsOpen] = React.useState(false);
    const[showLogout, setShowLogout] = useState(false);
    const lastKey = window.location.href.split("/");
    const key = lastKey[lastKey.length - 1];

    function openModalHandler() {
        if(showLogout){
            async function logout(){
                const accessToken = JSON.parse(window.sessionStorage.getItem("token-details"));
                  try {
                    const rawPromise = fetch('http://localhost:8080/auth/logout',{
                        method: 'POST',
                        headers: {
                          "Accept": "application/json;charset=UTF-8",
                          "authorization" : `Bearer ${accessToken}`
                        }
                    })
                    const rawResponse = await rawPromise;
                    
                  if(rawResponse.ok){
                      window.sessionStorage.removeItem("token-details");
                      window.sessionStorage.removeItem("user-details");
                      logoutIsSuccessful();
                  }else{
                      const error = new Error();
                      error.message = error.message ?  error.message : "something happened";
                      throw error;
                  }
            
                  } catch (error) {
                      alert(error);
                  }
            }
            logout();
            return;
        }
        setIsOpen(true);
      }
    function onCloseModalHandler() {
        setIsOpen(false);
    }
    function loginIsSuccessful(){
        setIsOpen(false);
        setShowLogout(true);
        props.checkUserLoggedIn(true);
    }
    function logoutIsSuccessful(){
        setShowLogout(false);
        props.checkUserLoggedIn(false);
    }
    return(
        <div>
            <div className = "header">
                <div>
                    <img src = {logo} className="logo" alt="LOGO"/>
                    <span className="textDoc">Doctor Finder</span>
                </div>
                <div className ="logButton">
                    <Button color = {showLogout ? "secondary": "primary"} variant="contained" onClick = {openModalHandler}>{showLogout ? "Logout": "Login"}</Button>
                </div>
            </div>
            {openModal ? <Login closeModal = {onCloseModalHandler} loginIsSuccessful = {loginIsSuccessful}></Login>: null}
        </div>
    ) 
}
