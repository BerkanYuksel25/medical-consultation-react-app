import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SubmitButton from "./SubmitButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "row wrap",
  },
  item: {
    flex: "1 1 33.34%",
    marginRight: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  details: {
    marginTop: theme.spacing(4),
  },
}));

/**
 * Prop types:
 *   1. Array<Object>: cards[{ heading, subHeading, details }]
 *   2. Function: clickHandler
 */
export default function CardList(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {props.cards.map((card, index) => {
        return (
          <div key={`card-${index}`} className={classes.item}>
            <Card>
              <CardContent>
                <Typography variant="h3">{card.heading}</Typography>
                <Typography component="p" color="textSecondary" variant="body2">
                  {card.subHeading}
                </Typography>
                <Typography
                  className={classes.details}
                  component="p"
                  color="textPrimary"
                  variant="body1"
                >
                  {card.details}
                </Typography>
              </CardContent>
              <CardActions>
                <SubmitButton
                  text="Details"
                  onClick={() => props.clickHandler()}
                />
              </CardActions>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
