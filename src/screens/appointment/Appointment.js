import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import RateAppointment from "./RateAppointment";
import { StarRate } from "@material-ui/icons";
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

function Appointment(props) {
    const [AppointmentData, setAppointmentData] = React.useState([]);
    const { classes } = props;
    const [isRateAppointMentCalled, setIsRateAppointMentCalled] = React.useState(false);

    function giveRatingToAppointment(){
        setIsRateAppointMentCalled(true);
    }
    function closeModal(){
        setIsRateAppointMentCalled(false);
    }
    function showAppointmentList(){
        async function appointmentList(){
            const accessToken = JSON.parse(window.sessionStorage.getItem("token-details"));
            const userId = JSON.parse(window.sessionStorage.getItem("user-details")).id;
            var URL = "http://localhost:8080/users/"+ userId + "/appointments";
                try {
                const rawPromise = fetch(URL,{
                    method: 'GET',
                    headers: {
                        "Accept": "application/json;charset=UTF-8",
                        "authorization" : `Bearer ${accessToken}`
                    }
                })
                const rawResponse = await rawPromise;
                var result = await rawResponse.json();
                
                if(rawResponse.ok){
                    console.log(result);
                    setAppointmentData(result);
                }else{
                    const error = new Error();
                    error.message = error.message ?  error.message : "something happened";
                    throw error;
                }
        
                } catch (error) {
                    alert(error);
            }
        }
        appointmentList();
    }
    useEffect(() => {
        showAppointmentList();
    },[]);

    return (
        <div>    
            <div className={classes.root}>
                {AppointmentData.map((data) => (
                    <Box key = {data.id} sx={{ width: '100%', margin: "15px", padding: "20px"}}>
                        <Paper elevation={3}>
                        <Box style = {{marginLeft: "30px"}}>
                            <Typography style={{fontWeight: "bold"}} variant="subtitle1" component = "h6">
                                Dr: {data.doctorName}
                            </Typography>
                            <Typography variant="subtitle1" component = "h6">
                                Date: {data.appointmentDate}
                            </Typography>
                            <Typography variant="subtitle1" component = "h6">
                                Symptoms: {data.symptoms ? data.symptoms : ""}
                            </Typography>
                            <Typography variant="subtitle1" component = "h6">
                                PriorMedicalHistory: {data.priorMedicalHistory ? data.priorMedicalHistory : ""}
                            </Typography>
                            <br />
                            <br />
                            <div>
                                <Button color = "primary" variant="contained" style={{marginBottom: "20px"}} onClick = {()=>giveRatingToAppointment(data.name)}> RATE APPOINTMENT</Button>
                            </div>
                        </Box>
                    </Paper>
                    </Box>
                ))}
            </div>
            {isRateAppointMentCalled ? <RateAppointment closeModal = {closeModal}></RateAppointment> : null}
        </div>
      );
}
export default withStyles(styles)(Appointment);

