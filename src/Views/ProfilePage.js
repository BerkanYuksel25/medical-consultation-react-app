import React from "react";
import {
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
import GlobalLayout from "../Components/GlobalLayout";
import SubmitButton from "../Components/SubmitButton";
import { validateEmail } from "../Common/Utils";
import { auth, database } from "../Services/firebase";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(8),
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));

  const [userdata, setUserdata] = React.useState({});

  const firstNameRef = React.useRef("");
  const lastNameRef = React.useRef("");
  const birthdayRef = React.useRef("");
  const emailRef = React.useRef("");

  const [errors, setErrors] = React.useState({});
  const [gender, setGender] = React.useState("other");

  React.useEffect(() => {
    const fetch = async () => {
      await database()
        .ref("users/" + user.uid)
        .once("value", (snap) => {
          console.log(snap.val());
          setUserdata(snap.val());
          firstNameRef.current = snap.val()["firstName"];
          lastNameRef.current = snap.val()["lastName"];
          birthdayRef.current = snap.val()["birthday"];
          emailRef.current = snap.val()["email"];
          setGender(snap.val()["gender"]);
        });
    };
    fetch();
  }, [user.uid, setUserdata]);

  const [registerError, setRegisterError] = React.useState(null);
  const [registerSuccess, setRegisterSuccess] = React.useState(null);

  const validateFields = () => {
    const firstName = firstNameRef.current;
    const lastName = lastNameRef.current;
    const birthday = birthdayRef.current;
    const email = emailRef.current;
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

    setErrors(newErrors);
  };

  const getValues = () => {
    const firstName = firstNameRef.current;
    const lastName = lastNameRef.current;
    const birthday = birthdayRef.current;
    const email = emailRef.current;

    return {
      firstName,
      lastName,
      email,
      birthday,
    };
  };

  const isValid = () => {
    const {
      firstName,
      lastName,
      email,
      birthday,
    } = getValues();
    return Boolean(
      !errors.firstName &&
        !errors.lastName &&
        !errors.email &&
        !errors.birthday &&
        userdata["firstName"] != firstName ||
        userdata["lastName"] != lastName ||
        userdata["email"] != email ||
        userdata["birthday"] != birthday ||
        userdata["gender"] != gender &&
        firstName &&
        lastName &&
        email &&
        birthday &&
        gender
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, firstName, lastName, birthday } = getValues();
    try {
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
      console.log("Edit done");
      setRegisterSuccess("Edit successful");
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <GlobalLayout title={`Edit profile`}>
      <div>
        <Typography
          className={classes.heading}
          variant="h1"
          color="textPrimary"
        >
          Edit {user.displayName}'s profile
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
            <Collapse in={Boolean(registerSuccess)}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setRegisterSuccess(null)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="success"
              >
                {registerSuccess}
              </Alert>
            </Collapse>
            <TextField
              ref={emailRef}
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
              value={emailRef.current || ''}
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
              value={firstNameRef.current || ''}
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
              value={lastNameRef.current || ''}
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
              value={birthdayRef.current || ''}
              format="dd/MM/yyyy"
              className={classes.textField}
              defaultValue="1970-01-01"
              fullWidth
            />
            {/* I need help here to get the radio button working*/}
            <FormControl className={classes.genderBox} component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                defaultValue="other"
                onChange={(event) => setGender(event.target.value)}
                value={gender || ''}
                row
                required
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <SubmitButton
              onClick={handleSubmit}
              disabled={!isValid()}
              text="Edit"
            />
          </form>
        </Typography>
      </div>
    </GlobalLayout>
  );
}
