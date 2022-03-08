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
    const [moviesData, setMoviesData] = React.useState([{id: "123", name: "siddharrth", specialist: "general", rating: 2}, {id: "3", name: "siddharrth", specialist: "pulmo", rating: 3}, {id: "12", name: "siddharrth", specialist: "cardio", rating: 5}]);
    const { classes } = props;
    const [isAppointMentCalled, setIsAppointmentCalled] = React.useState(false);
    const [isAppointMentDetailsCalled, setIsAppointmentDetailsCalled] = React.useState(false);
    const [doctorCalled, setDoctorCalled] = React.useState("");
    const [dropdownSelect, setDropdownSelect] = React.useState("");
    const [doctorsToShow, setDoctorsToShow] = React.useState(moviesData);

    function bookAppointment(doctorName){
        setDoctorCalled(doctorName);
        setIsAppointmentCalled(true);
    }
    function viewAppointmentDetails(){
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
        var arr = [];
        if(e.target.value === ""){
            arr = [...moviesData];
        }else{
            var data = [...moviesData];
            for(let i = 0; i < data.length; i++){
                if(data[i].specialist === e.target.value){
                    arr.push(data[i]);
                }
            }
        }
        setDoctorsToShow(arr);
        setDropdownSelect(e.target.value);
    }
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
                    <MenuItem value={"general"}>general</MenuItem>
                    <MenuItem value={"pulmo"}>pulmo</MenuItem>
                    <MenuItem value={"cardio"}>cardio</MenuItem>
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
                        Doctor Name: {data.name}
                    </Typography>
                    <br/>
                    <br/>
                    <Typography style = {{fontWeight: "bold"}} variant="subtitle1" component = "h6">
                        Speciality: {data.specialist}
                    </Typography>
                    <br/>
                    <Typography style = {{fontWeight: "bold"}} variant="subtitle1" component = "h6">
                        Rating: {[1,2,3,4,5].map((num)=>(
                        <StarRate style = {num <= data.rating ? {color: "yellow"} : {color: "pink"}} key = {data}></StarRate>
                    ))}
                    </Typography>
                    <div style={{display: "flex"}}>
                        <Button color = "primary" variant="contained" style={{flex: "50%", margin: "20px"}} onClick = {()=>bookAppointment(data.name)}> BOOK APPOINTMENT</Button>
                        <Button color = "default" variant="contained" style={{flex: "50%", margin: "20px", backgroundColor: "green", color:"white"}} onClick = {()=>viewAppointmentDetails()}>VIEW DETAILS</Button>
                    </div>
                </Box>
            </Paper>
            </Box>
        ))}
        {isAppointMentCalled ? <BookAppointment closeModal = {closeModal} doctorName = {doctorCalled}></BookAppointment> : null}
        {isAppointMentDetailsCalled ? <DoctorDetails closeModalDetails = {closeModalDetails}></DoctorDetails> : null}
        </div>
        </div>
      );
}
export default withStyles(styles)(DoctorList);

