import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> <a href="/auth/facebook">Login with Facebook</a></p>;
  }
}

render(<App/>, document.getElementById('app'));