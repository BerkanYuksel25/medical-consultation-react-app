import React from "react";
import HealthAssistant from "../Components/Chatbot/HealthAssistant";
import GlobalLayout from "../Components/GlobalLayout";
import DynamicAccordion from "../Components/DynamicAccordion";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(8),
  },
}));

export default function SingleAppointmentView() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
<GlobalLayout title={`Welcome, ${user.displayName}!`}>
      <div>
        <Typography
          className={classes.heading}
          variant="h3"
          color="textPrimary"
        >
         Appointment Info for {user.displayName}
        </Typography>
        
        <HealthAssistant />
      </div>
    </GlobalLayout>
  );
}
