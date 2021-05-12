import React from "react";
import {
  Typography,
  makeStyles,
} from "@material-ui/core";
import SideLayout from "../Components/SideLayout";

const useStyles = makeStyles((theme) => ({
  heading: {
    alignSelf: "flex-start",
    marginBottom: theme.spacing(4),
  },
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(4, 0),
  },
  link: {
    fontWeight: theme.typography.fontWeightBold,
  },
  genderBox: {
    width: "100%",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));


export default function AboutPage() {
  const classes = useStyles();
  const backgroundImageUrl = "/static/login.jpg";

  return (
    <SideLayout title="Sign Up" imageUrl={backgroundImageUrl}>
      <div>
        <Typography className={classes.heading} color="textPrimary" variant="h1">
          About
        </Typography>

        <Typography className={classes.heading} color="textPrimary" variant="subtitle2">
          In current pandemic situation we have experienced large number of people getting affected by the outbreak of covid-19.
          It is equally important that we ensure that whoever is affected by this outbreak gets the ability to recover.
          However, at the same time we need to ensure that they recover in very safe manner without affecting any other people due to its contagious nature of the virus.
          Therefore, we have proposed the idea of creating software system that has ability to detect if an individual has covid-19.
          Through designing interactive website that can allow user to chat with an automated chatbot system which can output answer according to their question
          will allow user to utilize the functionality anytime of the day.
          <li> Existing solutions are comprehensive and bulky diagnosis and online doctor solutions </li>
          <li> Will help to lighten the load on the Australian healthcare industry by reducing the number of unnecessary COVID tests. </li>
          <li> One of the first Australian AI medical apps </li>
        </Typography>
      </div>
    </SideLayout>
  );
}
