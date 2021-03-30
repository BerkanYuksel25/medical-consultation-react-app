import React, { Component } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import SubmitButton from "../Components/SubmitButton";

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
      events: [
        {
          start: moment().toDate(),
          end: moment()
            .add(1, "days")
            .toDate(),
          title: "Some title",
        },
      ],
      open: false,
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Calendar
              localizer={localizer}
              events={[]}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
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
                  margin="dense"
                  id="date"
                  label="Appointment Date"
                  type="datetime-local"
                  defaultValue={
                    new Date().getFullYear() +
                    "-" +
                    (new Date().getMonth() + 1) +
                    "-" +
                    new Date().getDate() +
                    "T" +
                    new Date().getHours() +
                    ":" +
                    new Date().getMinutes()
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
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
