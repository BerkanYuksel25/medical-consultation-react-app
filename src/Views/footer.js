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
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
    <p>This is some content in sticky footer</p>
  </div>
  );
}

