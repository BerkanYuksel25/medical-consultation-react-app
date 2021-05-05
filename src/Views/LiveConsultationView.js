import React from "react";
import { firestore } from "../Services/firebase";
import { useCollectionData } from "react-firebase-hooks";

export default function LiveConsultationView() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query);

  return <></>;
}
