import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Background from 'components/background';
import Index from 'screens/index';
import Three from 'screens/three';
import Tree from 'screens/tree';
import Rain from 'screens/rain';
import MovingCharacter from 'screens/movingCharacter';
import Starcraft from 'screens/starcraft';
import HiddenImage from 'screens/hiddenImage';
import Paint from 'screens/paint';
import MdToHtml from 'screens/mdToHtml';

const App = () => {
  return (
    <>
      {/* <Background /> */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/three" component={Three} />
          <Route exact path="/tree" component={Tree} />
          <Route exact path="/rain" component={Rain} />
          <Route exact path="/movingCharacter" component={MovingCharacter} />
          <Route exact path="/starcraft" component={Starcraft} />
          <Route exact path="/hiddenImage" component={HiddenImage} />
          <Route exact path="/paint" component={Paint} />
          <Route exact path="/mdToHtml" component={MdToHtml} />
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
