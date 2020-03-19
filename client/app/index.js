import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateProject from './components/create-forms/CreateProject';
import Dashboard from './components/layout/Dashboard';
import Users from './components/layout/Users';
import Projects from './components/layout/Projects';
import Ticket from './components/layout/Ticket';
import Landing from './components/layout/Landing';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import './index.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Route exact path='/' component={Landing} />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/users' component={Users} />
              <PrivateRoute path='/projects' component={Projects} />
              <PrivateRoute path='/tickets/:ticketId' component={Ticket} />
              <PrivateRoute
                exact
                path='/create-project'
                component={CreateProject}
              />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
