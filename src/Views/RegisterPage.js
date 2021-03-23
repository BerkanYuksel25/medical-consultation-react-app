import React from "react";
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
import { validateEmail, validateNewPassword } from "../Common/Utils";
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

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const backgroundImageUrl = "/static/login.jpg";

  const [errors, setErrors] = React.useState({});

  const [registerError, setRegisterError] = React.useState(null);

  const nameRef = React.useRef("");
  const emailRef = React.useRef("");
  const passwordRef = React.useRef("");
  const confirmPasswordRef = React.useRef("");

  const handleSignUpClick = (event) => {
    event.preventDefault();

    history.push("/login");
  };

  const validateFields = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const newErrors = {};

    if (!name || !name.length) {
      newErrors.name = "Empty name.";
    }

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!email || !email.length) {
      newErrors.email = "Empty email address.";
    }

    if (!validateNewPassword(password)) {
      newErrors.password =
        "New passwords must be at least 7 characters in length.";
    }

    if (
      confirmPassword !== password ||
      !confirmPassword ||
      !confirmPassword.length
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
  };

  const getValues = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    return { name, email, password, confirmPassword };
  };

  const isValid = () => {
    const { name, email, password, confirmPassword } = getValues();
    return Boolean(
      !errors.name &&
        !errors.email &&
        !errors.password &&
        !errors.confirmPassword &&
        name &&
        email &&
        password &&
        confirmPassword
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = getValues();

    try {
      await auth().createUserWithEmailAndPassword(email, password);

      history.replace("/dashboard");
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <SideLayout title="Sign In" imageUrl={backgroundImageUrl}>
      <Typography className={classes.heading} color="textPrimary" variant="h1">
        Sign Up
      </Typography>
      <form className={classes.form} noValidate>
        <Collapse in={Boolean(registerError)}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setRegisterError(null)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="error"
          >
            {registerError}
          </Alert>
        </Collapse>
        <TextField
          inputRef={nameRef}
          error={Boolean(errors.name)}
          helperText={errors.name}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          onBlur={validateFields}
          onChange={validateFields}
          autoFocus
        />
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
          autoComplete="new-password"
          onBlur={validateFields}
          onChange={validateFields}
        />
        <TextField
          inputRef={confirmPasswordRef}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="confirm-password"
          label="Confirm Password"
          name="confirm-password"
          type="password"
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
