import { makeStyles, Button } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#000000",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  footerp: {
    color: "#FFFFFF",
    textAlign: "center",
  },
}));

export default function FooterLogin() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
    <p className={classes.footerp}>Welcome to the App</p>
  </div>
  );
}

