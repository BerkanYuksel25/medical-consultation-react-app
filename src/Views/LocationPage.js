import React from "react";
import GlobalLayout from "../Components/GlobalLayout";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  subHeading: {
    marginTop: theme.spacing(4),
  },
}));

export default function LocationPage() {
  const classes = useStyles();

  return (
    <GlobalLayout title="Location">
      <Typography color="textPrimary" variant="h1">
        Maps go here.
      </Typography>
      <Typography
        className={classes.subHeading}
        color="textSecondary"
        variant="h2"
        component="p"
      >
        Will implement Google API here.
      </Typography>
      ;
    </GlobalLayout>
  );
}
