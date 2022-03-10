import React,{useState} from "react";
import reactDom from "react-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Modal from 'react-modal';
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { StarRate } from "@material-ui/icons";

const styles = (theme) => ({
    root: {
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
  const [openModal, setIsOpen] = React.useState(true);
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
                    className={classes.heading}
                    component="h2"
                  >
                    Doctors Details
                  </Typography>
                  <br />
            <Card>
                <CardContent>
                    <Box style = {{marginLeft: "15px"}}>
                        <Typography variant="subtitle1">
                            Dr: {props.doctorData.firstName + " " + props.doctorData.lastName}
                        </Typography>
                        <Typography variant="subtitle1">
                            Total Experience: {props.doctorData.totalYearsOfExp} Years
                        </Typography>
                        <Typography variant="subtitle1">
                            Speciality: {props.doctorData.speciality}
                        </Typography>
                        <Typography variant="subtitle1">
                            Date of Birth: {props.doctorData.dob}
                        </Typography>
                        <Typography variant="subtitle1">
                            city: {props.doctorData.address.city}
                        </Typography>
                        <Typography variant="subtitle1">
                            Email: {props.doctorData.emailId}
                        </Typography>
                        <Typography variant="subtitle1">
                            Mobile: {props.doctorData.mobile}
                        </Typography>
                        <Typography variant="subtitle1">
                            Rating: {[1,2,3,4,5].map((num)=>(
                            <StarRate style = {num <= props.doctorData.rating ? {color: "yellow"} : {color: "pink"}} key = {num}></StarRate>
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