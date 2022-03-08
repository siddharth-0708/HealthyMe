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
  const [value, setValue] = React.useState('one');
  var loggedIn = props.loginIsSuccessful;
  const { classes } = props;

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
                      value= {props.doctorName}
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
                      type="Date"
                    />
                  </FormControl>
                  <br/>
                  <FormControl>
                    <InputLabel htmlFor="TimeSlot">TimeSlot</InputLabel>
                    <Select placeholder={"TimeSlot"} value="">
                      {[2,3,4,5,5].map((data) => (
                        <MenuItem key={data}>
                          <Checkbox
                            id={data}
                            name={data}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <br/>
                  <FormControl>
                    <InputLabel htmlFor="medicalHistory">MedicalHistory</InputLabel>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Input
                      id="medicalHistory"
                      value= ""
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
                      value= ""
                    />
                  </FormControl>
                  <br/>
                  <br />
                    <br />
                  <Button
                    color="primary"
                    variant="contained"
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