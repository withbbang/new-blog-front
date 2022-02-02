import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Index from "screens/index";

const App = () => {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route
            path="*"
            component={(props: any) => (
              <div>"{props.location.pathname}" not found</div>
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
