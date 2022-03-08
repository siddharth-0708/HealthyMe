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
    const [AppointmentData, setAppointmentData] = React.useState([{id: "123", name: "siddharrth", date: "19-2-2111", symptoms: "", history: ""}, {id: "123", name: "rodshds", date: "19-2-2w11", symptoms: "cold", history: ""}, {id: "123", name: "lol", date: "19-2-2111", symptoms: "fever", history: "NA"}]);
    const { classes } = props;
    const [isRateAppointMentCalled, setIsRateAppointMentCalled] = React.useState(false);

    function giveRatingToAppointment(){
        setIsRateAppointMentCalled(true);
    }
    function closeModal(){
        setIsRateAppointMentCalled(false);
    }
    return (
        <div>    
            <div className={classes.root}>
                {AppointmentData.map((data) => (
                    <Box key = {data.id} sx={{ width: '100%', margin: "15px", padding: "20px"}}>
                        <Paper elevation={3}>
                        <Box style = {{marginLeft: "30px"}}>
                            <Typography style={{fontWeight: "bold"}} variant="subtitle1" component = "h6">
                                Dr: {data.name}
                            </Typography>
                            <Typography variant="subtitle1" component = "h6">
                                Date: {data.date}
                            </Typography>
                            <Typography variant="subtitle1" component = "h6">
                                Date: {data.symptoms}
                            </Typography>
                            <Typography variant="subtitle1" component = "h6">
                                PriorMedicalHistory: {data.history}
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

