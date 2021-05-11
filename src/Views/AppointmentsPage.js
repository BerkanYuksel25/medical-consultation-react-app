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
import DialogContentText from "@material-ui/core/DialogContentText";
import SubmitButton from "../Components/SubmitButton";
import { auth, database } from "../Services/firebase";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

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
      // Get current user data
      user: JSON.parse(localStorage.getItem("user")),
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
      apptType: "GP",
      apptTitle: "Example appointment",
      apptDocName: "Dr Nick",
      apptDescription: "Dr Nick will check you out",
      apptLocation: "Dr Nick's house",
      apptList: [],
      editing: false,
      eventKey: new Date(),
    };
  }

  componentDidMount = async () => {
    // Gets appointments from firebase db on start
    // updates when db is changed
    const apptsRef = database().ref(
      "appointments/" + this.state.user.uid + "/"
    );

    apptsRef.on("value", (snapshot) => {
      try {
        // Get data from firebase
        let appointments = snapshot.val();
        console.log("Appt refs from DB");
        console.log(appointments);

        // loop through data and set new state
        let newApptListState = [];
        for (let appt in appointments) {
          newApptListState.push({
            id: appt,
            apptTitle: appointments[appt].appointment_name,
            apptTime: appointments[appt].appointment_time,
            apptType: appointments[appt].appointment_type,
            apptDocName: appointments[appt].appointment_doc,
            apptDescription: appointments[appt].appointment_description,
            apptLocation: appointments[appt].appointment_location,
          });
        }
        this.setState({ apptList: newApptListState }, function() {
          // callback so that state can updated ayscn
          console.log("Setting apptList state, apptList:");
          console.log(this.state.apptList);
        });

        // delete and rework to use above loop ^^^
        //
        //
        //
        //
        var keys = Object.keys(appointments);
        var tempEvents = [{}];

        for (let i = 0; i < keys.length; i++) {
          var k = keys[i];
          var dbApptName = appointments[k].appointment_name;
          var dbApptTime = appointments[k].appointment_time;
          var dbApptDesc = appointments[k].appointment_description;
          //   console.log(dbApptName, dbApptTime);
          tempEvents.push({
            start: new Date(dbApptTime),
            end: new Date(dbApptTime),
            title: dbApptName,
            description: dbApptDesc,
          });
        }

        this.setState({ events: tempEvents });
        //
        //
        //
        //
      } catch (err) {
        // console.log("ERROR: no appointments in database");
        console.log("ERROR, details below");
        console.log(err);
      }
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = async (event) => {
    //if editing, delete and then recreate the event
    if (this.state.editing) this.deleteEvent(this.state.eventKey);

    //add to database
    console.log(this.state.apptDateTime.valueOf());
    console.log(this.state.apptTitle);
    await database()
      .ref(
        "appointments/" +
          this.state.user.uid +
          "/" +
          this.state.apptDateTime.valueOf()
      )
      .set({
        appointment_time: this.state.apptDateTime.toISOString(),
        appointment_name: this.state.apptTitle,
        appointment_type: this.state.apptType,
        appointment_doc: this.state.apptDocName,
        appointment_description: this.state.apptDescription,
        appointment_location: this.state.apptLocation,
      })
      .catch((error) => {
        console.log(error);
      });

    //add event to calender to display | might be useless code
    // this.state.events.push({
    //   start: this.state.apptDateTime,
    //   end: this.state.apptDateTime,
    //   title: this.state.apptTitle,
    // });

    this.resetDialogBox();
  };

  handleCancel = () => {
    this.resetDialogBox();
  };

  handleChangeFormApptType = (event) => {
    this.setState({ apptType: event.target.value });
  };

  handleChangeDateTime = (e) => {
    this.setState({ apptDateTime: new Date(e.target.value) });
  };

  handleChangeFormTitle = (e) => {
    this.setState({ apptTitle: e.target.value });
  };

  handleChangeFormDocName = (e) => {
    this.setState({ apptDocName: e.target.value });
  };

  handleChangeFormDescription = (e) => {
    this.setState({ apptDescription: e.target.value });
  };

  handleChangeFormLocation = (e) => {
    this.setState({ apptLocation: e.target.value });
  };

  handleSelectSlot = ({ start, end }) => {
    console.log("clicked calendar slot" + start + " " + end);
  };

  handleSelectEvent = async (e) => {
    //open dialog box with clicked events.
    this.setState({
      apptDateTime: e.start,
      apptTitle: e.title,
      open: true,
      editing: true,
      eventKey: e.start.valueOf(),
    });
  };

  handleDelete = () => {
    this.deleteEvent(this.state.apptDateTime);
    this.resetDialogBox();
  };

  resetDialogBox = () => {
    //closes dialog box and reset values
    this.setState({
      open: false,
      apptDateTime: new Date(),
      apptTitle: "Example appointment",
      apptDocName: "Dr Nick",
      apptDescription: "Dr Nick will check you out ;)",
      editing: false,
      eventKey: new Date(),
    });
  };

  deleteEvent = async (e) => {
    //delete event from db
    await database()
      .ref("appointments/" + this.state.user.uid + "/" + e.valueOf())
      .remove();
  };

  // createAppointmentCards() {
  //   var appts = this.state.apptList;
  //   console.log("create appoitment cards");
  //   console.log(appts);
  //   return appts.map((appt) => {
  //     <div>Test</div>;
  //   });
  //   // console.log("create appoitment cards");
  //   // console.log(appts);
  //   // return appts.map((el) => <div>Test lol</div>);
  // }

  render() {
    const { classes } = this.props;
    let deleteDialogButton;
    if (this.state.editing) {
      deleteDialogButton = (
        <Button onClick={this.handleDelete} color="primary">
          Delete
        </Button>
      );
    }

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
              popup
              //selectable
              //onSelectSlot={this.handleSelectSlot}
              onSelectEvent={this.handleSelectEvent}
            />
          </Grid>
          <Grid item xs={4}>
            <SubmitButton
              onClick={this.handleClickOpen}
              text="Create Appointment"
            />
            {/* {this.createAppointmentCards()} */}
            {this.state.apptList.reverse().map((appt) => {
              return (
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {appt.apptType}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {appt.apptTitle}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {appt.apptDocName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {appt.apptTime}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {appt.apptDescription}
                    </Typography>
                    <CardActions>
                      <Button size="small">More info</Button>
                    </CardActions>
                  </CardContent>
                </Card>
              );
            })}

            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                {this.state.editing ? "Edit Appointment" : "Add Appointment"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To {this.state.editing ? "edit" : "create"} an
                  appointment,please enter the mandatory fields.
                </DialogContentText>
                <TextField
                  id="txt_appt_type"
                  select
                  label="Select Appointment Type"
                  fullWidth
                  value={this.apptType}
                  onChange={this.handleChangeFormApptType}
                  // helperText="Please select your appointment type"
                >
                  <MenuItem value={"GP"}>GP</MenuItem>
                  <MenuItem value={"Specialist"}>Specialist</MenuItem>
                </TextField>

                <TextField
                  id="txt_title"
                  label="Appointment Title"
                  fullWidth
                  value={this.state.apptTitle}
                  onChange={this.handleChangeFormTitle}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="date"
                  fullWidth
                  label="Date"
                  type="datetime-local"
                  defaultValue={
                    this.state.apptDateTime.getFullYear() +
                    "-" +
                    ("0" + (this.state.apptDateTime.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + this.state.apptDateTime.getDate()).slice(-2) +
                    "T" +
                    ("0" + this.state.apptDateTime.getHours()).slice(-2) +
                    ":" +
                    ("0" + this.state.apptDateTime.getMinutes()).slice(-2)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChangeDateTime}
                />
                <TextField
                  id="txt_doc_name"
                  label="Physican"
                  fullWidth
                  value={this.state.apptDocName}
                  onChange={this.handleChangeFormDocName}
                />
                <TextField
                  id="txt_description"
                  label="Appointment Description"
                  fullWidth
                  value={this.state.apptDescription}
                  onChange={this.handleChangeFormDescription}
                />
                <TextField
                  id="txt_location"
                  label="Appointment Location"
                  fullWidth
                  value={this.state.apptLocation}
                  onChange={this.handleChangeFormLocation}
                />
              </DialogContent>
              <DialogActions>
                {deleteDialogButton}
                <Button onClick={this.handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                  {this.state.editing ? "Edit Appointment" : "Add Appointment"}
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
