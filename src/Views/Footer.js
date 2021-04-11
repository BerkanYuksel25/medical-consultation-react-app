import React from "react";
import { makeStyles, Grid, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(6, 0),
    color: "white",
  },
  links: {
    justifyContent: "space-evenly",
  },
  linkText: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="overline">&copy; 2021 SES3B Team 4</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid className={classes.links} container>
              <Grid item xs={12} sm={3}>
                <Link className={classes.linkText} to={"/DashboardPage"}>
                  Home
                </Link>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Link className={classes.linkText} to={"/AboutPage"}>
                  About
                </Link>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Link className={classes.linkText} to={"/LocationPage"}>
                  Location
                </Link>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Link className={classes.linkText} to={"/AppointmentsPage"}>
                  Appointments
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
