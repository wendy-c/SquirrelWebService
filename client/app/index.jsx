import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return (
      <div>
      <p> <a href="/auth/facebook">Login with Facebook</a></p>
      <p><a href="/auth/twitter">Sign in with Twitter</a></p>
      </div>
      );
  }
}

render(<App/>, document.getElementById('app'));