import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  heading: {
    flex: "0 0 33.33%",
  },
  accordion: {
    backgroundColor: "transparent",
    boxShadow: "unset",
  },
}));

/**
 * Prop type: Array<Object>: items[{ heading, details }]
 */
export default function DynamicAccordion(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {props.items.map((item, index) => {
        return (
          <Accordion
            key={`accordion-${index}`}
            className={classes.accordion}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}bh-content`}
              id={`panel${index + 1}bh-header`}
            >
              <Typography
                variant="h3"
                component="p"
                color="textPrimary"
                className={classes.heading}
              >
                {item.heading}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.details}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
