import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import SubmitButton from "../Components/SubmitButton";
import { auth, database } from "../Services/firebase";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});
const localizer = momentLocalizer(moment);

class AppointmentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      currentDateTime: new Date(),
      curDateTime: moment(props.date).format(new Date().toLocaleString()),
      txt_booking_title: "",
      txt_booking_time: "",
      events: [
        {
          //start: new Date(),
          //end: new Date(),
          ////  .add(0, "days"),
          //title: "Some title",
        },
      ],
      open: false,
      apptDateTime: new Date(),
      apptTitle: "Example appointment",
    };

    //get appointments from firebase db
    var db = database().ref("appointments/" + this.state.user.uid + "/");
    db.on('value', data =>{
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!! this function is getting called on everytime 
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!! db changes causing duplicate events in calendar
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!! current fix = refresh page
      console.log("db value changed");

      try {
				var appointmentsDB = data.val();
				var keys = Object.keys(appointmentsDB);

				for (var i = 0; i < keys.length; i++) {
					var k = keys[i];
					var dbApptName = appointmentsDB[k].appointment_name;
					var dbApptTime = appointmentsDB[k].appointment_time;
					//console.log(dbApptName);
					//console.log(dbApptTime);
					this.state.events.push({
						start: new Date(dbApptTime),
						end: new Date(dbApptTime),
						title: dbApptName,
					});
				}
			} catch (err) {
				console.log("ERROR: no appointments in database");
				console.log(err);
			}
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = async (event) => {
    console.log("before: " + this.state.events.length);
    console.log(this.state.apptDateTime.valueOf());
    console.log(this.state.apptTitle);
    await database()
      .ref("appointments/" + this.state.user.uid + "/" + this.state.apptDateTime.valueOf())
      .set({
        appointment_time: this.state.apptDateTime.toISOString(),
        appointment_name: this.state.apptTitle
      })
      .catch((error) => {
        console.log(error);
      });
    
    //add event to calender to display | might be useless code
    this.state.events.push({
      start: this.state.apptDateTime,
      end: this.state.apptDateTime,
      title: this.state.apptTitle,
    });

    //closes dialog box and reset values
    this.setState({
      open: false,
      apptDateTime: new Date(),
      apptTitle: "",
    });
    console.log("after: " + this.state.events.length);
  };

  handleCancel = () => {
    this.setState({
      open: false,
      apptDateTime: new Date(),
      apptTitle: "Example appointment",
    });
  };

  handleChangeDateTime = (e) => {
    this.setState({ apptDateTime: new Date(e.target.value) });
  };

  handleChangeTitle = (e) => {
    this.setState({ apptTitle: e.target.value });
  };

  handleSelectSlot = ({ start, end }) => {
    console.log("clicked calendar slot" + start + " " + end);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Calendar
              localizer={localizer}
              events={this.state.events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 900 }}
            //selectable
            //onSelectSlot={this.handleSelectSlot}
            />
          </Grid>
          <Grid item xs={4}>
            <SubmitButton
              onClick={this.handleClickOpen}
              text="Create Appointment"
            />
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Appointment</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>Date of Appointment</DialogContentText> */}
                <TextField
                  // margin="dense"
                  id="date"
                  label="Date"
                  type="datetime-local"
                  defaultValue={
                    new Date().getFullYear() +
                    "-" +
                    ("0" + (new Date().getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + new Date().getDate()).slice(-2) +
                    "T" +
                    ("0" + new Date().getHours()).slice(-2) +
                    ":" +
                    ("0" + new Date().getMinutes()).slice(-2)
                  }
                  // value={this.state.txt_booking_time}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChangeDateTime}
                />
                <TextField
                  id="title"
                  label="Name"
                  // value={this.state.apptTitle}
                  // defaultValue={this.state.user.displayName + "'s booking"}
                  value={this.state.apptTitle}
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  onChange={this.handleChangeTitle}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                  Add Appointment
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AppointmentsPage);
