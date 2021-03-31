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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import SideLayout from "../Components/SideLayout";
import SubmitButton from "../Components/SubmitButton";
import { validateEmail, validateNewPassword } from "../Common/Utils";
import { auth, database } from "../Services/firebase";

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
  const [gender, setGender] = React.useState(null);

  const [registerError, setRegisterError] = React.useState(null);

  const firstNameRef = React.useRef("");
  const lastNameRef = React.useRef("");
  const birthdayRef = React.useRef("");
  const emailRef = React.useRef("");
  const passwordRef = React.useRef("");
  const confirmPasswordRef = React.useRef("");

  const handleLoginClick = (event) => {
    event.preventDefault();
    history.push("/login");
  };

  const validateFields = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const birthday = birthdayRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const newErrors = {};

    if (!firstName || !firstName.length) {
      newErrors.firstName = "Empty first name.";
    }

    if (!lastName || !lastName.length) {
      newErrors.lastName = "Empty last name.";
    }

    if (!birthday || !birthday.length) {
      newErrors.birthday = "Empty birthday.";
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
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const birthday = birthdayRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    return {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      birthday,
    };
  };

  const isValid = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      birthday,
    } = getValues();
    return Boolean(
      !errors.firstName &&
        !errors.lastName &&
        !errors.email &&
        !errors.password &&
        !errors.confirmPassword &&
        !errors.birthday &&
        firstName &&
        lastName &&
        email &&
        password &&
        confirmPassword &&
        birthday
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, firstName, lastName, birthday } = getValues();

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      // add users displayname
      await auth().currentUser.updateProfile({
        displayName: firstName,
      });

      // store other user data in database
      const userId = auth().currentUser.uid;
      console.log(userId);
      await database()
        .ref("users/" + userId)
        .set({
          firstName: firstName,
          lastName: lastName,
          email: email,
          birthday: birthday,
          gender: gender,
        });

      history.push("/dashboard");
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <SideLayout title="Sign Up" imageUrl={backgroundImageUrl}>
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
          inputRef={firstNameRef}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First name"
          name="firstName"
          autoComplete="firstName"
          onBlur={validateFields}
          onChange={validateFields}
        />
        <TextField
          inputRef={lastNameRef}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last name"
          name="lastName"
          autoComplete="lastName"
          onBlur={validateFields}
          onChange={validateFields}
        />
        <TextField
          inputRef={birthdayRef}
          error={Boolean(errors.birthday)}
          helperText={errors.birthday}
          variant="outlined"
          margin="normal"
          required
          id="date"
          label="Birthday"
          type="date"
          name="birthday"
          onBlur={validateFields}
          onChange={validateFields}
          format="dd/MM/yyyy"
          className={classes.textField}
          defaultValue="1970-01-01"
          fullWidth
        />
        {/* I need help here to get the radio button working*/}
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            onChange={(event) => setGender(event.target.value)}
            row
            required
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
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
                onClick={handleLoginClick}
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
