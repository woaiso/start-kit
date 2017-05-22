import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

class App extends React.Component<any, any>{
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
ReactDOM.render(
  <Router>
    <div>
      <Route exact={true} path="/" component={App} />
      <Route path="/about" component={About} />
    </div>
  </Router>,
  document.getElementById('root'));
