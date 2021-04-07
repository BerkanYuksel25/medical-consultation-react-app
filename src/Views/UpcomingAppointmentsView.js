import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";
import CardList from "../Components/CardList";

/**
 * TODO: Remove this test after linking appointments to firebase.
 */
const testAppointments = [
  {
    heading: "Brain Scan",
    subHeading: "18/02/2021 12:00 PM - 1:00 PM",
    details: "You will see Dr John Smith for this appointment.",
  },
  {
    heading: "Diet Discussion",
    subHeading: "21/02/2021 6:00 PM - 8:00 PM",
    details: "You will see Dr Jane Smith for this appointment.",
  },
  {
    heading: "Sex Health Check-up",
    subHeading: "22/02/2021 9:00 AM - 10:00 AM",
    details: "You will see Dr Bob Doe for this appointment.",
  },
];

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(6),
  },
}));

export default function UpcomingAppointmentsView() {
  const classes = useStyles();
  const [appointments] = React.useState(testAppointments);
  const history = useHistory();

  const handleDetailsClick = (event) => {
    history.push("/AppointmentsPage");
  };

  return (
    <div>
      <Typography
        className={classes.heading}
        variant="body1"
        color="textPrimary"
      >
        Here's a list of your upcoming consultations.
      </Typography>
      <CardList cards={appointments} clickHandler={handleDetailsClick} />
    </div>
  );
}
