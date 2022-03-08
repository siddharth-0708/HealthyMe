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
import { Box } from "@material-ui/core";
import { StarRate } from "@material-ui/icons";

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

function DoctorDetails(props){
  const [doctorDetails, setDoctorDetails] = React.useState({name: "smith", experience: "21 years", speciality: "CARDIOLOGIST", birth: "22-01-1988", city: "hyderabad", Email: "Siddhs@gmail.com", mobile: "970025854",rating: 4});
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
        width: "15%",
        marginRight: '-50%',
        padding: 0,
        transform: 'translate(-50%, -50%)',

    },
  };

  function closeModal() {
    setIsOpen(false);
    props.closeModalDetails();
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
                    Doctors Details
                  </Typography>
                  <br />
            <Card>
                <CardContent>
                    <Box style = {{marginLeft: "15px"}}>
                        <Typography variant="subtitle1" component = "h6">
                            Dr: {doctorDetails.name}
                        </Typography>
                        <Typography variant="subtitle1" component = "h6">
                            Total Experience: {doctorDetails.experience}
                        </Typography>
                        <Typography variant="subtitle1" component = "h6">
                            Speciality: {doctorDetails.speciality}
                        </Typography>
                        <Typography variant="subtitle1" component = "h6">
                            Date of Birth: {doctorDetails.birth}
                        </Typography>
                        <Typography variant="subtitle1" component = "h6">
                            city: {doctorDetails.city}
                        </Typography>
                        <Typography variant="subtitle1" component = "h6">
                            Email: {doctorDetails.Email}
                        </Typography>
                        <Typography variant="subtitle1" component = "h6">
                            Mobile: {doctorDetails.mobile}
                        </Typography>
                        <Typography variant="subtitle1" component = "h6">
                            Rating: {[1,2,3,4,5].map((num)=>(
                            <StarRate style = {num <= doctorDetails.rating ? {color: "yellow"} : {color: "pink"}} key = {doctorDetails.rating}></StarRate>
                        ))}
                        </Typography>
                    </Box>
                    <br />
                    </CardContent>
              </Card>
        </div>
          </Modal>
        </div>,document.body
      );   
}
export default withStyles(styles)(DoctorDetails);