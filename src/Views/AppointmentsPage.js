import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const localizer = momentLocalizer(moment);

export default class AppointmentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          start: moment().toDate(),
          end: moment()
            .add(1, "days")
            .toDate(),
          title: "Some title"
        }
      ],
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({open: true});
  }
  
  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    return (
			<div className="App">
				<Calendar
					localizer={localizer}
					defaultDate={new Date()}
					defaultView="month"
					events={this.state.events}
					style={{ height: "1000px", width: "1000px" }}
				/>
				<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
					Add Appointment
				</Button>
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
              defaultValue={(new Date().getFullYear())+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate())+"T"+ (new Date().getHours())+":"+(new Date().getMinutes())}
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
			</div>
		);
  }
}
