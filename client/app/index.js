import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Sidebar from './components/layout/Sidebar';
import Landing from './components/layout/Landing';

import './index.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
