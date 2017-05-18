import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'normalize.css';
import './index.less';

class App extends React.Component<any, any>{
  render() {
    return (
      <div>
        <h1>Start Kit</h1>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
