import React from "react";
import AppointmentInfo from "Components/AppointmentInfo";
import LiveConsultationView from "./LiveConsultationView";

import { database } from "../Services/firebase";
import { useParams } from "react-router-dom";

export default function SingleAppointmentView() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [appointment, setAppointment] = React.useState({});

  React.useEffect(() => {
    const fetch = async () => {
      await database()
        .ref(`appointments/${user.uid}/${id}`)
        .once("value", (snap) => {
          setAppointment(snap.val());
        });
    };

    fetch();
  }, [user.uid, id]);

  const dummyAppointment = {
    description: "Dr Nick will check you out ;)",
    doc: "Dr Nick",
    location: "Dr Nick's house",
    name: "Example appointment",
    time: "2021-05-11T14:03:31.500Z",
    type: "GP",
    state: "upcoming",
  };

  return dummyAppointment.state === "live" ? (
    <LiveConsultationView />
  ) : (
    <AppointmentInfo appointment={dummyAppointment} />
  );
}
