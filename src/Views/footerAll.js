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
    fontWeight: "bold",
  },
  footerLinks: {
    display: "flex",
  },
  footerCol: {
    flex: "0 1 50%",
    color: "#FFFFFF",
  },
  footerA: {
      color: "#FFFFFF",
      display: "block",
      marginTop: "5px",
      textAlign: "center",
      textDecoration: "none",
      fontWeight: "bold",
      '&:hover': {
        color: "#73303d",
      },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
    <p className={classes.footerp}>Welcome to the App</p>
    <div className={classes.footerLinks}>
        <div className={classes.footerCol}>
        <a className={classes.footerA} href="/dashboard">Home</a>
        <a className={classes.footerA} href="/AppointmentsPage">Appointments</a>
        </div>
        <div className={classes.footerCol}>
        <a className={classes.footerA} href="/LocationPage">Location</a>
        <a className={classes.footerA} href="/About">About</a>
        </div>
    </div>
  </div>
  );
}

