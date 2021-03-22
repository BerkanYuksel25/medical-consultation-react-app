import React from "react";
import {
  Box,
  Typography,
  makeStyles,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import GlobalLayout from "../Components/GlobalLayout";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  subHeading: {
    marginTop: theme.spacing(2),
  },
  buttonContainer: {
    margin: theme.spacing(8, 0),
  },
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleRegisterClick = () => {
    history.push("/register");
  };

  return (
    <GlobalLayout title="Home Page">
      <Typography color="textPrimary" variant="h1">
        Home Page
      </Typography>
      <Typography
        className={classes.subHeading}
        color="textSecondary"
        variant="h2"
        component="p"
      >
        This page is used for testing purposes only.
      </Typography>
      <Box className={classes.buttonContainer} component="div">
        <ButtonGroup
          size="large"
          color="secondary"
          variant="contained"
          aria-label="outlined primary button group"
          orientation="vertical"
          fullWidth
        >
          <Button onClick={handleLoginClick}>Login</Button>
          <Button onClick={handleRegisterClick}>Register</Button>
        </ButtonGroup>
      </Box>
    </GlobalLayout>
  );
}
