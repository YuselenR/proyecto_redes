import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import chatApp from "./chat";

const Applications = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/chat`} />

      <Route path={`${match.url}/chat`} component={chatApp} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default Applications;
