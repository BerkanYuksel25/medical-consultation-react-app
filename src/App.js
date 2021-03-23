import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  );
}
