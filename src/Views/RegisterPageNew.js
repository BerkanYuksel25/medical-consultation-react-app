import React from "react";
import { useHistory } from "react-router-dom";
import {
  Link,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import SideLayout from "../Components/SideLayout";
import SubmitButton from "../Components/SubmitButton";

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
}));

export default function LoginPageNew() {
  const classes = useStyles();
  const history = useHistory();
  const backgroundImageUrl = "/static/login.jpg";

  const handleSignUpClick = (event) => {
    event.preventDefault();

    history.push("/login-test");
  };

  return (
    <SideLayout title="Sign In" imageUrl={backgroundImageUrl}>
      <Typography className={classes.heading} color="textPrimary" variant="h1">
        Sign Up
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="confirm-password"
          label="Confirm Password"
          name="confirm-password"
          type="password"
        />
        <SubmitButton label="Continue" />
        <Grid container>
          <Grid item>
            <Typography variant="body1">
              Already Have An Account?{" "}
              <Link
                className={classes.link}
                href="#"
                onClick={handleSignUpClick}
              >
                Sign In
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </SideLayout>
  );
}
