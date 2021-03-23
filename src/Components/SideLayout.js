import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import GlobalLayout from "./GlobalLayout";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    borderRadius: "100px",
  },
  image: (props) => ({
    backgroundImage: `url(${props.imageUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "contrast(75%) brightness(90%)",
  }),
  paperWrapper: {
    alignSelf: "center",
    padding: theme.spacing(0, 8),
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function SideLayout({ imageUrl, title, children }) {
  const classes = useStyles({ imageUrl });

  return (
    <GlobalLayout title={title}>
      <Grid className={classes.root} container component="main">
        <Grid className={classes.paperWrapper} item xs={12} sm={8} md={5}>
          <div className={classes.paper}>{children}</div>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
    </GlobalLayout>
  );
}
