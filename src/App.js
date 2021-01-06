import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component.jsx";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

function App() {
  return (
    <div className="App">
      <Switch>
        {/* Switch is used to prevent rendering 2 pages at a time. 
        The moment it sees some URL match, it's gonna render that page
        and ignore all others */}
        <Route exact path="/" component={HomePage} />
        {/* if we don't have exact (a boolean value), the URL ends with
      "/hats" will also show up the HomePage */}
        <Route path="/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
