import React from 'react';
import { hot } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink,
} from 'react-router-dom';
// import RouterToUrlQuery from 'react-url-query/lib/react/RouterToUrlQuery';

import Home from './Home';
import About from './About';
import Evaluations from './Evaluations';
import ErrorBoundary from './ErrorBoundary';
import Nav from './Nav';

import * as db from '../db';


// Set default NavLink activeClassName
NavLink.defaultProps.activeClassName = 'is-active';




const App = () => (
  <Router>
      <>
        <Nav/>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/evaluations" component={Evaluations}/>
            <Route render={() => { throw { code: 404 }; }}/>
          </Switch>
        </ErrorBoundary>
        <Route render={({ history }) => {
          // Auto-update service worker on route change
          history.listen(() => {
            if (window.swUpdate === true) window.location.reload();
          });
          return null;
        }}/>
      </>
  </Router>
);

export default hot(module)(App);
