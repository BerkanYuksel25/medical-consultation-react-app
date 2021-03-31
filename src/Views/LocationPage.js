import React from "react";
import GlobalLayout from "../Components/GlobalLayout";
import GoogleMapReact from 'google-map-react'
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  subHeading: {
    marginTop: theme.spacing(4),
  },
}));

const location = {
  address: 'University of Technology Sydney',
  lat: 33.8832,
  lng: 151.2005,
}

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};

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
