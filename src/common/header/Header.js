import React, { useEffect,useState } from "react";
import logo from '../../assets/logo.jpeg';
import "./Header.css";
import {Button} from "@material-ui/core";
//import Modal from "../../screens/modals/Modal";
import Login from "../../screens/login/Login";
import {Link} from "react-router-dom";

export default function Header(props){
    const [openModal, setIsOpen] = React.useState(false);
    const[showBookShowBtn, setBookShowBtn] = useState(false);
    const[showLogout, setShowLogout] = useState(false);
    const lastKey = window.location.href.split("/");
    const key = lastKey[lastKey.length - 1];

    function openModalHandler() {
        if(showLogout){
            async function logout(){
                const accessToken = JSON.parse(window.sessionStorage.getItem("token-details"));
                  try {
                    const rawPromise = fetch('http://localhost:8085/api/v1/auth/logout',{
                        method: 'POST',
                        headers: {
                          "Accept": "application/json;charset=UTF-8",
                          "authorization" : `Bearer ${accessToken}`
                        }
                    })
                    const rawResponse = await rawPromise;
                    //var result = await rawResponse.json();
                    
                  if(rawResponse.ok){
                      window.sessionStorage.removeItem("token-details");
                      window.sessionStorage.removeItem("user-details");
                      props.logoutIsSuccessful();
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
    function showBookShowButton() {
        setBookShowBtn(true);
    }
    function hideBookShowButton() {
        setBookShowBtn(false);
    }
    function showLogoutFunc() {
        setShowLogout(true);
    }
    function hideLogoutFunc() {
        setShowLogout(false);
    }
    function ButtonComponent() {
        if(!showLogout){
            return(
                <div className ="bookButton">
                    {showBookShowBtn ? <Button color = "primary" onClick = {openModalHandler} variant="contained">Book Show</Button> : null}
                </div>
            )
        }else{
            return(
                <div className ="bookButton">
                    {showBookShowBtn ? <Link to = {{pathname: `/bookshow/${key}`}}><Button color = "primary" variant="contained">Book Show</Button></Link> : null}
                </div>
            )
        }
    }
    // useEffect(() => {
    //     if(props.updateBtn){
    //         showBookShowButton();
    //     }else{
    //         hideBookShowButton();
    //     }
    //     if(props.isLoggedIn){
    //         showLogoutFunc();
    //     }else{
    //         hideLogoutFunc();
    //     }
    // });
    return(
        <div className = "header">
            <img src = {logo} className="logo" alt="LOGO"/>
            <span className="textDoc">Doctor Finder</span>
            <div className ="logButton">
            <Button color = {showLogout ? "secondary ": "primary"} variant="contained" onClick = {openModalHandler}>{showLogout ? "Logout": "Login"}</Button>
            </div>
            {openModal ? <Login closeModal = {onCloseModalHandler} loginIsSuccessful = {props.loginIsSuccessful} showLogout = {showLogoutFunc}></Login>: null}
        </div>
    ) 
}
