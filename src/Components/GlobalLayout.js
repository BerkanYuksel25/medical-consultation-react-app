import React from "react";
import Helmet from "react-helmet";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    justifyContent: "center",
  },
  container: {
    margin: "4% 0",
  },
}));

export default function GlobalLayout({ title, children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container className={classes.container} maxWidth="lg">
        {children}
      </Container>
    </div>
  );
}
