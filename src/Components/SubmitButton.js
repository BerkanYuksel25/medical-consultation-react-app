import { makeStyles, Button } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(4, 0),
    background:
      "linear-gradient(90deg, rgba(115,48,61,1) 0%, rgba(166,48,46,1) 50%)",
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function SubmitButton(props) {
  const classes = useStyles();

  return (
    <Button
      className={classes.submit}
      onClick={props.onClick}
      size="large"
      type="submit"
      fullWidth
      disabled={props.disabled}
      variant="contained"
      color="primary"
    >
      {props.text}
    </Button>
  );
}
