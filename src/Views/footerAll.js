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
  footerLinks: {
    display: "flex",
  },
  footerCol: {
    flex: "0 1 50%",
    color: "#FFFFFF",
  },
  footerA: {
      color: "#FFFFFF",
      textDecoration: "none",
      fontWeight: "bold",
      '&:hover': {
        color: "rgb(116, 33, 32)",
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
        </div>
        <div className={classes.footerCol}>
        <a className={classes.footerA} href="#">Footer Links Here</a>
        </div>
    </div>
  </div>
  );
}

