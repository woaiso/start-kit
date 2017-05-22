import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import 'normalize.css';
import './index.less';

class About extends React.Component<any, any>{
  render() {
    return (
      <div>
        <h1>About Page</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </div>
    );
  }
}

class Home extends React.Component<any, any>{
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    )
  }
}

const NoMatch = () => (
  <div>
    <h2>Not Found</h2>
  </div>
);

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route component={NoMatch} />
    </Switch>
  </Router>,
  document.getElementById('root'));
