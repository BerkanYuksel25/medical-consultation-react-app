import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import GlobalLayout from "../Components/GlobalLayout";

const useStyles = makeStyles((theme) => ({
  zain: {
    marginTop: theme.spacing(8),
    color: "green",
  },
}));

export default function SettingsPage() {
  const classes = useStyles();

  return (
    <GlobalLayout title="Settings">
      <Typography variant="h1">Hello</Typography>
      <Typography className={classes.zain} variant="h2">
        World
      </Typography>
    </GlobalLayout>
  );
}
