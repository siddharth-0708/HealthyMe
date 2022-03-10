import React, { useState} from "react";
import reactDom from "react-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Modal from 'react-modal';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import { FormHelperText } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { TextField } from "@material-ui/core";
import {Button} from "@material-ui/core";
import { StarRate } from "@material-ui/icons";
import "./RateAppointment.css";

const styles = (theme) => ({
    root: {
      width: 500
    },
    heading: {
      fontSize: "17px",
      color:"white",
      backgroundColor: "purple",
      paddingTop:"35px",
      paddingLeft:"11px",
      height: "70px"
    },
  });

function RateAppointment(props){
  const [openModal, setIsOpen] = React.useState(true);
  const [commentsValue, setCommentsValue] = React.useState("");
  const [ratingValue, setRatingValue] = React.useState("");
  const [reqRating, setReqRating] = useState("dispNone");
  var loggedIn = props.loginIsSuccessful;
  const [starColor, setStarColor] = React.useState(["nocolorStar","nocolorStar","nocolorStar","nocolorStar","nocolorStar"]);

  const { classes } = props;

  console.log(props);
  
  Modal.setAppElement('#root');

  
  const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: "45%",
        marginRight: '-50%',
        padding: 0,
        transform: 'translate(-50%, -50%)',

    },
  };

  function closeModal() {
    setIsOpen(false);
    props.closeModal();
  }
  function commentAdded(e) {
    setCommentsValue(e.target.value);
  }

  function changeStarColorHandler(event){
    if(event.target.id === ""){
      setRatingValue("");
      return;
    }
    var state = parseInt(event.target.id, 10);
    var starTemp = [];
    for(let i = 0; i < starColor.length; i++){
        i <= state ? starTemp.push("colorStar") : starTemp.push("nocolorStar");
    }
    setRatingValue(parseInt(event.target.id, 10) + 1)
    setStarColor(starTemp);
  }
  function submitRating(){

    async function submit(){

      const accessToken = JSON.parse(window.sessionStorage.getItem("token-details"));

      const params = {
        "appointmentId": props.ratingData.appointmentId,
        "doctorId": props.ratingData.doctorId,
        "rating": ratingValue,
        "comments": commentsValue
      }
        try {
          const rawPromise = fetch('http://localhost:8080/ratings',{
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                "Accept": "application/json;charset=UTF-8",
                "Content-Type": "application/json;charset=UTF-8",
                "authorization" : `Bearer ${accessToken}`
              }
          })
          const rawResponse = await rawPromise;
          
        if(rawResponse.ok){
            alert("Rating submitted");
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
    submit();
}
  function ratingSubmitted(){
    console.log(ratingValue);
    if(ratingValue === ""){
      setReqRating("dispBlock");
      return;
    }
    submitRating();
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
                    RATE AN APPOINTMENT
                  </Typography>
                  <br />
            <Card>
                <CardContent>
                  <FormControl>
                  <InputLabel shrink={true} htmlFor="comments">
                      comments
                    </InputLabel>
                    <br />
                    <TextField
                      id="comments"
                      type="Text"
                      value={commentsValue}
                      onChange={(e)=>commentAdded(e)}
                    />
                  </FormControl>
                  <br />
                  <br />
                  <Typography style = {{fontWeight: "bold"}} variant="subtitle1" component = "h6">
                        Rating: {[0,1,2,3,4].map((num)=>(
                        <StarRate id = {num} className = {starColor[num]} onClick = {changeStarColorHandler} key = {num}></StarRate>
                    ))}
                    </Typography>
                    <FormHelperText className={reqRating}>
                      <span className="red">select a rating</span>
                    </FormHelperText>
                    <br />
                  <br />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick = {ratingSubmitted}
                  >
                    RATE APPOINTMENT
                  </Button> 
                  <br />
                    <br />
                    </CardContent>
              </Card>
        </div>
          </Modal>
        </div>, document.body
      );   
}
export default withStyles(styles)(RateAppointment);