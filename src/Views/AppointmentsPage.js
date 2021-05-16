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
      //vvvvvvvvvv Dialog Box Variables vvvvvvvvvv
      dialogApptType: "GP",
      dialogApptTitle: "Example appointment",
      dialogApptDateTime: new Date(),
      dialogApptDocName: "Dr Nick",
      dialogApptDescription: "Dr Nick will check you out",
      dialogApptLocation: "Dr Nick's house",
      //^^^^^^^^^^ Dialog Box Variables ^^^^^^^^^^
      apptList: [{
        //id: ,
        //apptTitle: ,
        //apptTime: ,
        //apptType: ,
        //apptDocName: ,
        //apptDescription: ,
        //apptLocation: ,
      }],
      //Variables used for editing
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
      } catch (err) {
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
    console.log(this.state.dialogApptDateTime.valueOf());
    console.log(this.state.dialogApptTitle);
    await database()
      .ref(
        "appointments/" +
          this.state.user.uid +
          "/" +
          this.state.dialogApptDateTime.valueOf()
      )
      .set({
        appointment_time: this.state.dialogApptDateTime.toISOString(),
        appointment_name: this.state.dialogApptTitle,
        appointment_type: this.state.dialogApptType,
        appointment_doc: this.state.dialogApptDocName,
        appointment_description: this.state.dialogApptDescription,
        appointment_location: this.state.dialogApptLocation,
      })
      .catch((error) => {
        console.log(error);
      });

    this.resetDialogBox();
  };

  handleCancel = () => {
    this.resetDialogBox();
  };

  handleChangeFormApptType = (event) => {
    this.setState({ dialogApptType: event.target.value });
  };

  handleChangeDateTime = (e) => {
    this.setState({ dialogApptDateTime: new Date(e.target.value) });
  };

  handleChangeFormTitle = (e) => {
    this.setState({ dialogApptTitle: e.target.value });
  };

  handleChangeFormDocName = (e) => {
    this.setState({ dialogApptDocName: e.target.value });
  };

  handleChangeFormDescription = (e) => {
    this.setState({ dialogApptDescription: e.target.value });
  };

  handleChangeFormLocation = (e) => {
    this.setState({ dialogApptLocation: e.target.value });
  };

  handleSelectSlot = ({ start, end }) => {
    console.log("clicked calendar slot" + start + " " + end);
  };

  handleSelectEvent = async (e) => {
    //open dialog box with clicked events.
    this.setState({
      dialogApptType: e.apptType,
      dialogApptTitle: e.apptTitle,
      dialogApptDateTime: new Date(e.apptTime),
      dialogApptDocName: e.apptDocName,
      dialogApptDescription: e.apptDescription,
      dialogApptLocation: e.apptLocation,
      open: true,
      editing: true,
      eventKey: new Date(e.apptTime),
    });
  };

  handleCardClick = (e) => {
    this.handleSelectEvent(e);
  }

  handleDelete = () => {
    this.deleteEvent(this.state.dialogApptDateTime);
    this.resetDialogBox();
  };

  resetDialogBox = () => {
    //closes dialog box and reset values
    this.setState({
      open: false,
      dialogApptDateTime: new Date(),
      dialogApptTitle: "Example appointment",
      dialogApptDocName: "Dr Nick",
      dialogApptDescription: "Dr Nick will check you out ;)",
      editing: false,
      eventKey: new Date(),
    });
  };

  deleteEvent = async (dbKey) => {
    //delete event from db
    await database()
      .ref("appointments/" + this.state.user.uid + "/" + dbKey.valueOf())
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
              events={this.state.apptList}
              startAccessor="apptTime"
              endAccessor="apptTime"
              titleAccessor="apptTitle"
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
                      {new Date(appt.apptTime).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {appt.apptDescription}
                    </Typography>
                    <CardActions>
                      <Button size="small" onClick={() => this.handleCardClick(appt)}>More info</Button>
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
                  appointment, please enter the mandatory fields.
                </DialogContentText>
                <TextField
                  id="txt_appt_type"
                  select
                  label="Appointment Type"
                  fullWidth
                  value={this.state.dialogApptType}
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
                  value={this.state.dialogApptTitle}
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
                    this.state.dialogApptDateTime.getFullYear() +
                    "-" +
                    ("0" + (this.state.dialogApptDateTime.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + this.state.dialogApptDateTime.getDate()).slice(-2) +
                    "T" +
                    ("0" + this.state.dialogApptDateTime.getHours()).slice(-2) +
                    ":" +
                    ("0" + this.state.dialogApptDateTime.getMinutes()).slice(-2)
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
                  value={this.state.dialogApptDocName}
                  onChange={this.handleChangeFormDocName}
                />
                <TextField
                  id="txt_description"
                  label="Appointment Description"
                  fullWidth
                  value={this.state.dialogApptDescription}
                  onChange={this.handleChangeFormDescription}
                />
                <TextField
                  id="txt_location"
                  label="Appointment Location"
                  fullWidth
                  value={this.state.dialogApptLocation}
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
