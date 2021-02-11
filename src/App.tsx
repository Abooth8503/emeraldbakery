import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { EmeraldProvider } from './Interfaces/EmeraldTypes';
import Dashboard from './Common/Dashboard';
import history from './Common/History';

// Used when a user hits a route not defined below
const FourOhFour = (): JSX.Element => (
  <div>
    <h1>Page not found</h1>
    <p>
      Go back to <Link to='/'>Dashboard</Link>.
    </p>
  </div>
);

function App() {
  return (
    <EmeraldProvider>
      <Router history={history}>
        <Switch>
          <Route exact path='/' render={() => <Dashboard />} />

          <Route component={FourOhFour} />
        </Switch>
      </Router>
    </EmeraldProvider>
  );
}

export default App;
