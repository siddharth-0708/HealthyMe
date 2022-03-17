import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { StarRate } from "@material-ui/icons";
import BookAppointment from "./BookAppointment";
import DoctorDetails from "./DoctorDetails";
import { FormControl, FormHelperText } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
  }
});

function DoctorList(props) {
    const { classes } = props;
    const [isAppointMentCalled, setIsAppointmentCalled] = React.useState(false);
    const [isAppointMentDetailsCalled, setIsAppointmentDetailsCalled] = React.useState(false);
    const [doctorCalled, setDoctorCalled] = React.useState("");
    const [dropdownSelect, setDropdownSelect] = React.useState("");
    const [doctorsToShow, setDoctorsToShow] = React.useState([]);
    const [speciality, setSpeciality] = React.useState("");

    function bookAppointment(doctor){
        setDoctorCalled(doctor);
        setIsAppointmentDetailsCalled(false);
        setIsAppointmentCalled(true);
    }
    function viewAppointmentDetails(doctor){
        setDoctorCalled(doctor);
        setIsAppointmentCalled(false);
        setIsAppointmentDetailsCalled(true);
    }
    function closeModal(){
        setDoctorCalled("");
        setIsAppointmentCalled(false);
    }
    function closeModalDetails(){
        setIsAppointmentDetailsCalled(false);
    }
    function handleChange(e){
        if(e.target.value === ""){
            setSpeciality("");
        }else{
            setSpeciality(e.target.value);
        }
        setDropdownSelect(e.target.value);
    }
    function showDoctorsList(){
        async function doctorList(){
            if(speciality === ""){
                var URL = "http://localhost:8080/doctors"
            }else{
                var params = new URLSearchParams({
                    speciality: speciality,
                    }).toString();
                 var URL = "http://localhost:8080/doctors?" + params;   
            }
              try {
                const rawPromise = fetch(URL,{
                    method: 'GET',
                    headers: {
                      "Accept": "application/json;charset=UTF-8",
                    }
                })
                const rawResponse = await rawPromise;
                var result = await rawResponse.json();
                
              if(rawResponse.ok){
                setDoctorsToShow(result);
                console.log(result);
              }else{
                  const error = new Error();
                  error.message = error.message ?  error.message : "something happened";
                  throw error;
              }
        
              } catch (error) {
                  alert(error);
              }
        }
        doctorList();
    }
    useEffect(() => {
        showDoctorsList();
    },[speciality]);

    return (
        <div>
            <div style={{display: "flex", justifyContent:"center"}}>
                <div>
                    <FormControl>
                    <FormHelperText>Select Speciality</FormHelperText>
                    <Select
                    value={dropdownSelect}
                    onChange={(e) =>handleChange(e)} 
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"CARDIOLOGIST"}>CARDIOLOGIST</MenuItem>
                    <MenuItem value={"GENERAL_PHYSICIAN"}>GENERAL PHYSICIAN</MenuItem>
                    <MenuItem value={"DENTIST"}>DENTIST</MenuItem>
                    <MenuItem value={"PULMONOLOGIST"}>PULMONOLOGIST</MenuItem>
                    <MenuItem value={"ENT"}>ENT</MenuItem>
                    <MenuItem value={"GASTRO"}>GASTRO</MenuItem>
                    </Select>
                </FormControl>
                </div>
            </div>    

      <div className={classes.root}>
        {doctorsToShow.map((data) => (
            <Box key = {data.id} sx={{ width: '50%', margin: "10px"}}>
                <Paper elevation={3}>
                <Box style = {{marginLeft: "30px"}}>
                    <Typography style = {{fontWeight: "bold"}} variant="subtitle1" component = "h6">
                        Doctor Name: {data.firstName + " " + data.lastName}
                    </Typography>
                    <br/>
                    <br/>
                    <Typography style = {{fontWeight: "bold"}} variant="subtitle1" component = "h6">
                        Speciality: {data.speciality}
                    </Typography>
                    <br/>
                    <Typography style = {{fontWeight: "bold"}} variant="subtitle1" component = "h6">
                        Rating: {[1,2,3,4,5].map((num)=>(
                        <StarRate style = {num <= data.rating ? {color: "yellow"} : {color: "pink"}} key = {num}></StarRate>
                    ))}
                    </Typography>
                    <div style={{display: "flex"}}>
                        <Button color = "primary" variant="contained" style={{flex: "50%", margin: "20px"}} onClick = {()=>bookAppointment(data)}> BOOK APPOINTMENT</Button>
                        <Button color = "default" variant="contained" style={{flex: "50%", margin: "20px", backgroundColor: "green", color:"white"}} onClick = {()=>viewAppointmentDetails(data)}>VIEW DETAILS</Button>
                    </div>
                </Box>
            </Paper>
            </Box>
        ))}
        {isAppointMentCalled ? <BookAppointment loginIsSuccessful ={props.loginIsSuccessful} closeModal = {closeModal} doctorData = {doctorCalled}></BookAppointment> : null}
        {isAppointMentDetailsCalled ? <DoctorDetails closeModalDetails = {closeModalDetails} doctorData = {doctorCalled}></DoctorDetails> : null}
        </div>
        </div>
      );
}
export default withStyles(styles)(DoctorList);

