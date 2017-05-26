import * as React from 'react';
import { Link } from './../../router';

const styles = require('./index.less');
export default class App extends React.Component<any, any>{
  render() {
    return (
      <div>
        <h1 className={styles.title}>Home Page</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    );
  }
}
