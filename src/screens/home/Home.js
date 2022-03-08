import React, { useState, useEffect } from "react";
import reactDom from "react-dom";
import Header from "../../common/header/Header";
import { Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { TabPanel} from "@material-ui/core";
import "./Home.css";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";

const Home = () => {
    const [value, setValue] = React.useState('one');
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      function TabPanel(props) {
        const {value} = props;

        if(value === "one"){
            return (
              <div>
                  <DoctorList></DoctorList>
              </div>
            );
          }else{
            return (
                <div>
                  {isUserLoggedIn ? <Appointment></Appointment> : <div style={{display: "flex"}}><p style={{margin: "auto", padding: "20px", justifyItems:"center", fontWeight:"bold"}}>Login to see appointments</p></div>}
            </div>
            );
          }
      }

    return (
        <div className="main-container">
            <Header></Header>
            <Tabs
            value={value}
            onChange={handleChange}
            variant = "fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
         >
            <Tab value="one"  label="DOCTORS"/> 
            <Tab value="two"  label="APPOINTMENTS" />
      </Tabs>
            <TabPanel value={value}>
            </TabPanel>
        </div>
    );
  };
  
  export default Home;