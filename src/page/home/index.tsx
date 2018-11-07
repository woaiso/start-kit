import * as React from 'react';
import { Link } from './../../router';
import Rx from 'rxjs/Rx';

const styles = require('./index.less');
export default class App extends React.Component<any, any> {
  componentDidMount() {
    console.log('didMount');
    var myObservable = new Rx.Subject();
    myObservable.subscribe(value => console.log(value));
    myObservable.next('foo');
  }
  render() {
    return (
      <div>
        <h1 className={styles.title}>Home Page</h1>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    );
  }
}
