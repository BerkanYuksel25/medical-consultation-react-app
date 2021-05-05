import React from "react";
import GlobalLayout from "../Components/GlobalLayout";
import {
  Typography,
  makeStyles,
  Grid,
  ListItem,
  List,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(8),
  },
  details: {
    marginTop: theme.spacing(8),
  },
  flexHeadings: {
    fontWeight: theme.typography.h2.fontWeight,
  },
  buttons: {
    height: "40px",
    width: "82px",
    background: "#ea3a3a",
    color: "#FFFFFF",
    border: "#ea3a3a",
    cursor: "pointer",
    display: "block",
    margin: "10px",
  },
  buttonRow: {
    display: "flex",
  },
}));

export default function SingleAppointmentView() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <GlobalLayout title={`Your Appointment Info`}>
      <Typography className={classes.heading} variant="h1" color="textPrimary">
        Here's your appointment info, {user.displayName}.
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography className={classes.flexHeadings} variant="h3">
            <strong>Time: </strong> 6:00 PM - 8:00 PM
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className={classes.flexHeadings} variant="h3">
            <strong>Date: </strong>10 January 2021
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className={classes.flexHeadings} variant="h3">
            <strong>Your Doctor: </strong>Dr William Smith
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.details}>
            Your Symptoms
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Fatigue" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Nausea" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Headache" />
            </ListItem>
          </List>
          <Typography variant="h3" className={classes.details}>
            Additional Details
          </Typography>
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas
            porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,
            purus lectus malesuada libero, sit amet commodo magna eros quis
            urna.
          </Typography>
          <Typography variant="h3" className={classes.details}>
            Can't Make It?
          </Typography>
          <Typography variant="body1" component="p">
           Request a change to your appointment or make a cancellation below
          </Typography>
          <div className={classes.buttonRow}>
          <button className={classes.buttons}>Cancel</button>
          <button className={classes.buttons}>Request Change</button>
          </div>
        </Grid>
      </Grid>
    </GlobalLayout>
  );
}
