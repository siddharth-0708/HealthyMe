import React, { useState, useEffect } from "react";
import reactDom from "react-dom";
import { Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Modal from 'react-modal';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Button, Checkbox } from "@material-ui/core";
import { TimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = (theme) => ({
    root: {
      margin: theme.spacing.unit,
      width: 500,
    },
    heading: {
      fontSize: "17px",
      color:"white",
      backgroundColor: "purple",
      paddingTop:"20px",
      paddingLeft:"20px",
      height: "50px"
    },
  });

function BookAppointment(props){
  const [openModal, setIsOpen] = React.useState(true);
  const [dateValue, setDateValue] = React.useState(null);
  const [medicalHistoryValue, setMedicalHistoryValue] = React.useState("");
  const [symptomsValue, setSymptomsValue] = React.useState("");
  const [timeValue, setTimeValue] = React.useState(null);
  var loggedIn = props.loginIsSuccessful;
  const { classes } = props;

  const [dateValueReq, setreqDate] = useState("dispNone");
  const [timeValueReq, setreqTime] = useState("dispNone");

  console.log(props);
  
  Modal.setAppElement('#root');

  
  const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: "55%",
        marginRight: '-50%',
        padding: 0,
        transform: 'translate(-50%, -50%)',

    },
  };

  function closeModal() {
    setIsOpen(false);
    props.closeModal();
  }
  function dateIsChanged(e) {
    console.log(e.target.value);
    setDateValue(e.target.value);
  }
  function timeIsChanged(e) {
    console.log(e);
    setTimeValue(e);
  }
  function medicalHistoryIsChanged(e) {
    setMedicalHistoryValue(e.target.value);
  }
  function symptomsIsChanged(e) {
    setSymptomsValue(e.target.value);
  }
  function submitAppointment(){
      dateValue === null ? setreqDate("dispBlock") : setreqDate("dispNone");
      timeValue === null ? setreqTime("dispBlock") : setreqTime("dispNone");
  
      if (dateValue === null || timeValue === null) {
        return;
      }
      async function appoint(){

        const accessToken = JSON.parse(window.sessionStorage.getItem("token-details"));
        const userDetails = JSON.parse(window.sessionStorage.getItem("user-details"));

        const params = {
          "doctorId": props.doctorData.id,
          "doctorName": props.doctorData.firstName + " " + props.doctorData.lastName,
          "userId": userDetails.id,
          "userName": userDetails.firstName,
          "userEmailId": userDetails.emailAddress,
          "timeSlot": timeValue,
          "appointmentDate": dateValue,
          "symptoms": symptomsValue !== "" ? symptomsValue : "",
          "priorMedicalHistory": medicalHistoryValue !== "" ? medicalHistoryValue : ""
        }
        console.log(props);
        console.log(params);
          try {
            const rawPromise = fetch('http://localhost:8080/appointments/appointments',{
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                  "Accept": "application/json;charset=UTF-8",
                  "Content-Type": "application/json;charset=UTF-8",
                  "authorization" : `Bearer ${accessToken}`
                }
            })
            const rawResponse = await rawPromise;
            //var result = await rawResponse.json();
            
          if(rawResponse.ok){
              alert("your Appointment is booked");
              closeModal();
          }else{
              const error = new Error();
              //error.message = result.message ?  result.message : "something happened";
              throw error;
          }
    
          } catch (error) {
            console.log("errrrrrrrrrrrrrrrr");
              alert(error);
          }
    }
    appoint();
  }
  
    return reactDom.createPortal(
        <div>
          <Modal
            isOpen={openModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
        <div>
            <Typography
                    variant="headline"
                    className={classes.heading}
                    component="h2"
                  >
                    BOOK AN APPOINTMENT
                  </Typography>
                  <br />
            <Card>
                <CardContent>
                  <FormControl>
                    <InputLabel htmlFor="doctorName">doctorName</InputLabel>
                    <Input
                      id="doctorName"
                      disabled
                      value= {props.doctorData.firstName + " " + props.doctorData.lastName}
                    />
                  </FormControl>
                  <br />
                  <br />
                  <FormControl>
                    <InputLabel shrink={true} htmlFor="releaseStart">
                      Date Picker Inline
                    </InputLabel>
                    <br />
                    <TextField
                      id="releaseStart"
                      data-date-format="YYYY MM DD"
                      type="Date"
                      onChange={(e) => dateIsChanged(e)}
                    />
                    <FormHelperText className={dateValueReq}>
                      <span className="red">Select a date</span>
                    </FormHelperText>
                  </FormControl>
                  <br/>
                  <br/>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                          label="TimeSlot"
                          value={timeValue}
                          onChange={(e) => timeIsChanged(e)}
                        />
                      <FormHelperText className={timeValueReq}>
                        <span className="red">Select a time slot</span>
                    </FormHelperText>  
                 </MuiPickersUtilsProvider>
                  <br/>
                  <FormControl>
                    <InputLabel htmlFor="medicalHistory">MedicalHistory</InputLabel>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Input
                      id="medicalHistory"
                      value= {medicalHistoryValue}
                      onChange={(e) => medicalHistoryIsChanged(e)}
                    />
                  </FormControl>
                  <br/>
                  <FormControl>
                    <InputLabel htmlFor="symptoms">symptoms</InputLabel>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Input
                      id="symptoms"
                      value= {symptomsValue}
                      onChange={(e) => symptomsIsChanged(e)}
                    />
                  </FormControl>
                  <br/>
                  <br />
                    <br />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={submitAppointment}
                  >
                    BOOK APPOINTMENT
                  </Button>
                  <br />
                    <br />
                    </CardContent>
              </Card>
        </div>
          </Modal>
        </div>,document.body
      );   
}
export default withStyles(styles)(BookAppointment);
