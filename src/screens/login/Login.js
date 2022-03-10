import React, { useState, useEffect } from "react";
import reactDom from "react-dom";
import "./Login.css";
import { Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Button} from "@material-ui/core";
import Modal from 'react-modal';

export default function Login(props){
  const [openModal, setIsOpen] = React.useState(true);
  const [value, setValue] = React.useState('one');
  var loggedIn = props.loginIsSuccessful;

    Modal.setAppElement('#root');
    
    useEffect(() => {
      isOpenModal();
    },[]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: 0,
            transform: 'translate(-50%, -50%)',
  
        },
      };

    function isOpenModal(){
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
      props.closeModal();
    }

    function TabPanel(props) {
        const {value} = props;

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [contact, setContact] = useState("");
        const [isvalidEmail, setIsValidEmail] = useState("dispNone");

        const [reqUsername, setreqUsername] = useState("dispNone");
        const [reqPassword, setreqPassword] = useState("dispNone");
        const [reqFirstName, setreqFirstName] = useState("dispNone");
        const [reqLastName, setreqLastName] = useState("dispNone");
        const [reqEmail, setreqEmail] = useState("dispNone");
        const [reqContact, setreqContact] = useState("dispNone");
        const [registerContact, setRegisterContact] = useState("dispNone");

        function onLoginClick(e){

          function validateEmail(mail) 
          {
           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
            {
              return (true)
            }
              return (false)
          }
          username === "" ? setreqUsername("dispBlock") : setreqUsername("dispNone");
          password === "" ? setreqPassword("dispBlock") : setreqPassword("dispNone");

          if(validateEmail(username)){
            setIsValidEmail("dispNone");
          }else{
            setIsValidEmail("dispBlock");
          }
      
          if (username === "" || password === "" || !validateEmail(username)) {
            return;
          }

          async function login(){
            var params = window.btoa(`${username}:${password}`);
              try {
                const rawPromise = fetch('http://localhost:8080/auth/login',{
                    method: 'POST',
                    headers: {
                      "Accept": "application/json;charset=UTF-8",
                      "authorization" : `Basic ${params}`
                    }
                })
                const rawResponse = await rawPromise;
                var result = await rawResponse.json();
                
              if(rawResponse.ok){
                  window.sessionStorage.setItem('user-details', JSON.stringify(result));
                  window.sessionStorage.setItem('token-details', JSON.stringify(result.accessToken));
                  loggedIn();
                  closeModal();
              }else{
                  const error = new Error();
                  error.message = result.message ?  result.message : "something happened";
                  throw error;
              }
        
              } catch (error) {
                  alert(error);
              }
        }
        login();
      }
        function onRegisterClick(e){
          function validateEmail(mail) 
          {
           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
            {
              return (true)
            }
              return (false)
          }

          password === "" ? setreqPassword("dispBlock") : setreqPassword("dispNone");
          firstName === "" ? setreqFirstName("dispBlock") : setreqFirstName("dispNone");
          lastName === "" ? setreqLastName("dispBlock") : setreqLastName("dispNone");
          email === "" ? setreqEmail("dispBlock") : setreqEmail("dispNone");
          contact === "" ? setreqContact("dispBlock") : setreqContact("dispNone");

          if(validateEmail(email)){
            setIsValidEmail("dispNone");
          }else{
            setIsValidEmail("dispBlock");
          }

          if (password === "" || firstName === "" || lastName === "" || email === "" || contact === "" || !validateEmail(email)) {
            return;
          }

          async function registerSubmit(){
            const params = {
                "firstName": firstName,
                "lastName": lastName,
                "mobile": contact,
                "emailId": email,
                "password": password
              }
              try {
                const rawPromise = fetch('http://localhost:8080/users/register',{
                     
                body: JSON.stringify(params),
                      method: 'POST',
                      headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json;charset=UTF-8"
                    }
                })
                const rawResponse = await rawPromise;
                        
              if(rawResponse.ok){
                  setRegisterContact("dispBlockRegister");
              }else{
                  const error = new Error();
                  error.message = error.message ?  error.message : "something happened";
                  throw error;
              }
        
              } catch (error) {
                  alert(error);
              }
        }
        registerSubmit();

    }

        if(value === "one"){
          return (
            <div className = "loginPanel">
            <FormControl required className = "formControl">
              <InputLabel htmlFor="username">
               Email
              </InputLabel>
              <Input id = "email" type="email" value = {username} onChange={(e) => setUsername(e.target.value)}/>
              <FormHelperText className={reqUsername}>
                <span className="red">Required</span>
              </FormHelperText>
              <FormHelperText className={isvalidEmail}>
                <span className="red">Enter valid Email</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className = "formControl">
              <InputLabel htmlFor="password">
               password
              </InputLabel>
              <Input id = "password" value = {password} type = "password" onChange={(e) => setPassword(e.target.value)} />
              <FormHelperText className={reqPassword}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <br/>
          <Button color = "primary" variant="contained" onClick = {onLoginClick}>Login</Button>
          <br/>
          <br/>
          </div>
          );
        }else{
          return (
            <div className = "RegisterPanel">
            <FormControl required className = "formControl">
              <InputLabel htmlFor="firstname">
               First Name
              </InputLabel>
              <Input id = "firstname" value = {firstName} onChange={(e) => setFirstName(e.target.value)}/>
              <FormHelperText className={reqFirstName}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className = "formControl">
              <InputLabel htmlFor="lastname">
               Last Name
              </InputLabel>
              <Input id = "lastname" value = {lastName} onChange={(e) => setLastName(e.target.value)}/>
              <FormHelperText className={reqLastName}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className = "formControl">
              <InputLabel htmlFor="email">
               Email Id
              </InputLabel>
              <Input id = "email" value = {email} type = "email" onChange={(e) => setEmail(e.target.value)}/>
              <FormHelperText className={reqEmail}>
                <span className="red">Required</span>
              </FormHelperText>
              <FormHelperText className={isvalidEmail}>
                <span className="red">Enter valid Email</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className = "formControl">
              <InputLabel htmlFor="password">
               Password
              </InputLabel>
              <Input id = "password"  value = {password} type = "password" onChange={(e) => setPassword(e.target.value)}/>
              <FormHelperText className={reqPassword}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className = "formControl">
              <InputLabel htmlFor="contact">
               Mobile No
              </InputLabel>
              <Input id = "contact" value = {contact} onChange={(e) => setContact(e.target.value)}/>
              <FormHelperText className={reqContact}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <span className={registerContact}>Registration successfull. Please login!</span>
          <br/>
          <Button color = "primary" className="registerButton" variant="contained" onClick = {onRegisterClick}>Register</Button>
          <br/>
          <br/>
          </div>
          );
        }
      }

    return reactDom.createPortal(
        <div>
          <Modal
            isOpen={openModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
        <div className="headingDiv">
            <h2 className="AuthenticationHeading">
                Authentication
            </h2>
        </div> 
        <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
         >
            <Tab value="one" label="LOGIN"/> 
            <Tab value="two" label="REGISTER" />
      </Tabs>
            <TabPanel value={value}>
            </TabPanel>
          </Modal>
        </div>,document.body
      );   
}