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

export default function ForgotPasswordPage() {
    const classes = useStyles();
    const history = useHistory();
    const backgroundImageUrl = "/static/login.jpg";

    const [errors, setErrors] = React.useState({});

    const [loginError, setLoginError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    const emailRef = React.useRef("");

    const handleLoginClick = (event) => {
        event.preventDefault();
        history.push("/login");
    };

    const validateFields = () => {
        const email = emailRef.current.value;
        const newErrors = {};

        if (!validateEmail(email)) {
            newErrors.email = "Invalid email address.";
        }

        if (!email || !email.length) {
            newErrors.email = "Empty email address.";
        }

        setErrors(newErrors);
    };

    const getValues = () => {
        const email = emailRef.current.value;
        return { email };
    };

    const isValid = () => {
        const { email } = getValues();
        return Boolean(!errors.email && email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email } = getValues();
        try {
            await auth().sendPasswordResetEmail(email).then;
            setSuccess("Sent a password reset email");
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <SideLayout title="Forgot password" imageUrl={backgroundImageUrl}>
            <Typography className={classes.heading} color="textPrimary" variant="h1">
                Forgot password
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
                    <Collapse in={Boolean(success)}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => setSuccess(null)}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            severity="success"
                        >
                            {success}
                        </Alert>
                    </Collapse>
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
                <SubmitButton
                    onClick={handleSubmit}
                    disabled={!isValid()}
                    text="Reset password"
                />
                <Grid container>
                    <Grid item>
                        <Typography variant="body1">
                            Remembered password?{" "}
                            <Link
                                className={classes.link}
                                href="#"
                                onClick={handleLoginClick}
                            >
                                Login
              </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </SideLayout>
    );
}
