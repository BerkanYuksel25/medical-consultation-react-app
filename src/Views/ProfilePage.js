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
  Button,
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import GlobalLayout from "../Components/GlobalLayout";
import SubmitButton from "../Components/SubmitButton";
import { validateEmail, validateNewPassword } from "../Common/Utils";
import { auth, database } from "../Services/firebase";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(8),
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));

  const firstNameRef = React.useRef("");
  const lastNameRef = React.useRef("");
  const birthdayRef = React.useRef("");
  const emailRef = React.useRef("");
  const password = React.useRef("");
  const confirmPassword = React.useRef("");

  const [errors, setErrors] = React.useState({});
  const [gender, setGender] = React.useState(null);

  const [registerError, setRegisterError] = React.useState(null);
  const [registerSuccess, setRegisterSuccess] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [passwordSuccess, setPasswordSuccess] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);

  React.useEffect(() => {
    const fetch = async () => {
      await database()
        .ref("users/" + user.uid)
        .once("value", (snap) => {
          firstNameRef.current = snap.val()["firstName"];
          lastNameRef.current = snap.val()["lastName"];
          birthdayRef.current = snap.val()["birthday"];
          emailRef.current = snap.val()["email"];
          setGender(snap.val()["gender"]);
          validateFields();
        });
    };
    fetch();
  }, [user.uid]);

  const handleClickOpen = () => {
    setPasswordSuccess(false);
    setPasswordError(false);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
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

  const validateFields = (e, ref) => {
    if (ref) {
      ref.current = e.target.value;
    }

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

  const validatePassword = () => {
    const newErrors = {};
    const pass = password.current.value;
    const confirmPass = confirmPassword.current.value;
    if (!validateNewPassword(pass)) {
      newErrors.password =
        "New passwords must be at least 7 characters in length.";
    }
    if (
      confirmPass !== pass ||
      !confirmPass ||
      !confirmPass.length
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
  }

  const isValid = () => {
    return Boolean(
      !errors.firstName && !errors.lastName && !errors.email && !errors.birthday
    );
  };

  const isValidPassword = () => {
    return Boolean(
      !errors.password && !errors.confirmPassword
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, firstName, lastName, birthday } = getValues();
    try {
      // edit users email
      await auth().currentUser.updateEmail(email);
      // edit users displayname
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

  const handleNewPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth().currentUser.updatePassword(password.current.value);
      setPasswordSuccess("Password has been changed")
      password.current.value = "";
      confirmPassword.current.value = "";
      validatePassword();
    } catch (error) {
      setPasswordError(error.message);
    }
  }



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
              onChange={(e) => validateFields(e, emailRef)}
              value={emailRef.current}
            />
            <TextField
              ref={firstNameRef}
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
              onChange={(e) => validateFields(e, firstNameRef)}
              value={firstNameRef.current}
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
              onChange={(e) => validateFields(e, lastNameRef)}
              value={lastNameRef.current || ""}
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
              onChange={(e) => validateFields(e, birthdayRef)}
              value={birthdayRef.current || ""}
              format="dd/MM/yyyy"
              className={classes.textField}
              defaultValue="1970-01-01"
              fullWidth
            />
            <FormControl className={classes.genderBox} component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                onChange={(event) => setGender(event.target.value)}
                value={gender || ""}
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
          <SubmitButton text="Change password" onClick={handleClickOpen} />
          <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
            <DialogContent>
              <Collapse in={Boolean(passwordError)}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setPasswordError(null)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  severity="error"
                >
                  {passwordError}
                </Alert>
              </Collapse>
              <Collapse in={Boolean(passwordSuccess)}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setPasswordSuccess(null)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  severity="success"
                >
                  {passwordSuccess}
                </Alert>
              </Collapse>
              <DialogContentText>
                Please fill in your new password
              </DialogContentText>
              <TextField
                autoFocus
                inputRef={password}
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
                onBlur={validatePassword}
                onChange={validatePassword}
              />
              <TextField
                inputRef={confirmPassword}
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
                onBlur={validatePassword}
                onChange={validatePassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} variant="contained" color="primary" disabled={!isValidPassword()} onClick={handleNewPasswordSubmit}>
                Change password
              </Button>
            </DialogActions>
          </Dialog>
        </Typography>
      </div>
    </GlobalLayout>
  );
}
