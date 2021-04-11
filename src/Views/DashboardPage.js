import React, { Component } from "react";
import Footer from './footerAll';
import { auth } from "../Services/firebase";
import React from "react";
import HealthAssistant from "../Components/Chatbot/HealthAssistant";
import GlobalLayout from "../Components/GlobalLayout";
import DynamicAccordion from "../Components/DynamicAccordion";
import { Typography, makeStyles } from "@material-ui/core";
import DashboardSections from "../Models/DashboardSections";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(8),
  },
}));

export default function DashboardPage() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <GlobalLayout title={`Welcome, ${user.displayName}!`}>
      <Typography className={classes.heading} variant="h1" color="textPrimary">
        Welcome, {user.displayName}!
      </Typography>
      <DynamicAccordion items={DashboardSections} />
      <HealthAssistant />
      <Footer/>
    </GlobalLayout>
  );
}
