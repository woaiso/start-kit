import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link as ReactLink } from 'react-router-dom';
import NotFound from './page/not-found';
import About from './page/about';
import Home from './page/home';

export const Link = ReactLink;

export default () => (
  <Router>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
