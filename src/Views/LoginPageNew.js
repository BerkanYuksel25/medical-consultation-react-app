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

    history.push("/register-test");
  };

  return (
    <SideLayout title="Sign In" imageUrl={backgroundImageUrl}>
      <Typography className={classes.heading} color="textPrimary" variant="h1">
        Sign In
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
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
          autoComplete="current-password"
        />
        <SubmitButton label="Continue" />
        <Grid container>
          <Grid item>
            <Typography variant="body1">
              Don't have an account?{" "}
              <Link
                className={classes.link}
                href="#"
                onClick={handleSignUpClick}
              >
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </SideLayout>
  );
}
