import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Background from "components/background";
import Index from "screens/index";
import Three from "screens/three";

const App = () => {
  return (
    <>
      {/* <Background /> */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/three" component={Three} />
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
