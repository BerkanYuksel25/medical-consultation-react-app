import React from "react";
import FooterLogin from './footer'
import { useHistory } from "react-router-dom";
import {
  Link,
  Grid,
  makeStyles,
  TextField,
  Typography,
  Collapse,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import SideLayout from "../Components/SideLayout";
import SubmitButton from "../Components/SubmitButton";
import { validateEmail, validatePassword } from "../Common/Utils";
import { auth } from "../Services/firebase";

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

export default function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const backgroundImageUrl = "/static/login.jpg";

  const [errors, setErrors] = React.useState({});

  const [loginError, setLoginError] = React.useState(null);

  const emailRef = React.useRef("");
  const passwordRef = React.useRef("");

  const handleSignUpClick = (event) => {
    event.preventDefault();

    history.push("/register");
  };

  const validateFields = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!email || !email.length) {
      newErrors.email = "Empty email address.";
    }

    if (!validatePassword(password)) {
      newErrors.password = "Empty password.";
    }

    setErrors(newErrors);
  };

  const getValues = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    return { email, password };
  };

  const isValid = () => {
    const { email, password } = getValues();
    return Boolean(!errors.email && !errors.password && email && password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = getValues();

    try {
      await auth().signInWithEmailAndPassword(email, password);

      history.push("/");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <SideLayout title="Sign In" imageUrl={backgroundImageUrl}>
      <Typography className={classes.heading} color="textPrimary" variant="h1">
        Sign In
      </Typography>
      <form className={classes.form} noValidate>
        <Collapse in={Boolean(loginError)}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setLoginError(null)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="error"
          >
            {loginError}
          </Alert>
        </Collapse>
        <TextField
          inputRef={emailRef}
          error={Boolean(errors.email)}
          helperText={errors.email}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          onBlur={validateFields}
          onChange={validateFields}
          autoFocus
        />
        <TextField
          inputRef={passwordRef}
          error={Boolean(errors.password)}
          helperText={errors.password}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          onBlur={validateFields}
          onChange={validateFields}
        />
        <SubmitButton
          onClick={handleSubmit}
          disabled={!isValid()}
          text="Continue"
        />
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
      <FooterLogin />
    </SideLayout>
  );
}
