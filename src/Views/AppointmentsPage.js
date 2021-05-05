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
import { ThreeSixty } from "@material-ui/icons";

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
      apptDocName: "Dr Nick",
      apptDescription: "",
      apptList: [],
    };
  }

  componentDidMount() {
    // get appointments from firebase db
    // updates when db is changed or on start
    var db = database().ref("appointments/" + this.state.user.uid + "/");
    db.on("value", (data) => {
      try {
        var appointmentsDB = data.val();
        var keys = Object.keys(appointmentsDB);
        var tempEvents = [{}];

        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var dbApptName = appointmentsDB[k].appointment_name;
          var dbApptTime = appointmentsDB[k].appointment_time;
          var dbApptDesc = appointmentsDB[k].appointment_description;
          //   console.log(dbApptName, dbApptTime);
          tempEvents.push({
            start: new Date(dbApptTime),
            end: new Date(dbApptTime),
            title: dbApptName,
            description: dbApptDesc,
          });
          this.setState({ events: tempEvents });
          this.setState((state) => {
            const apptList = state.apptList.concat(tempEvents);
            return {
              apptList,
            };
          });
          console.log(this.state.apptList);
        }

        for (var i = 0; i < this.tempEvents.length; i++) {
          console.log(tempEvents[i]);
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

    //closes dialog box and reset values
    this.setState({
      open: false,
      apptDateTime: new Date(),
      apptTitle: "",
    });
  };

  handleCancel = () => {
    this.setState({
      open: false,
      //apptDateTime: new Date(),
      apptTitle: "Example appointment",
      apptDocName: "Dr Nick",
      apptDescription: "Dr Nick will check you out ;)",
    });
  };

  handleChangeDateTime = (e) => {
    this.setState({ apptDateTime: new Date(e.target.value) });
  };

  handleChangeTitle = (e) => {
    this.setState({ apptTitle: e.target.value });
  };

  handleChangeFormDocName = (e) => {
    this.setState({ apptDocName: e.target.value });
  };
  handleChangeFormDescription = (e) => {
    this.setState({ apptDescription: e.target.value });
  };

  handleSelectSlot = ({ start, end }) => {
    console.log("clicked calendar slot" + start + " " + end);
  };

  handleSelectEvent = async (e) => {
    //doesnt work for some reason. doesnt set dialog box to correct date.
    // this.setState({
    // 	apptDateTime: e.start, //this one doesnt work
    // 	apptTitle: e.title, //this one works
    // 	open: true,
    // });
    // this.state.apptDateTime = new Date(e.start); //this one doesnt

    console.log(e.start);
    console.log(this.state.apptDateTime);
    console.log(e.title);

    //delete event from db
    // await database()
    // 	.ref(
    // 		"appointments/" +
    // 			this.state.user.uid +
    // 			"/" +
    // 			e.start.valueOf()
    // 	)
    // 	.remove();
  };

  createAppointmentCards() {}

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

            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Sample Appointment
                </Typography>
                <Typography variant="h5" component="h2">
                  Dental Check-up
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  date goes here
                </Typography>
                <Typography variant="body2" component="p">
                  Desc goes here
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">More info</Button>
              </CardActions>
            </Card>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Appointment</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To create an appointment, please enter the mandatory fields.
                </DialogContentText>
                <TextField
                  id="title"
                  label="Name"
                  fullWidth
                  value={this.state.apptTitle}
                  onChange={this.handleChangeTitle}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="date"
                  fullWidth
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChangeDateTime}
                />
                <TextField
                  id="form-doc-name"
                  label="Physican"
                  fullWidth
                  value={this.state.apptDocName}
                  onChange={this.handleChangeFormDocName}
                />
                <TextField
                  id="form-description"
                  label="Appointment description"
                  fullWidth
                  value={this.state.apptDescription}
                  onChange={this.handleChangeFormDescription}
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
