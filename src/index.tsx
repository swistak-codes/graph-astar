import React from "react";
import ReactDOM from "react-dom/client";
import { PresentationsGraphAstar } from "./presentations-graph-astar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PresentationsGraphAstar />
  </React.StrictMode>
);
