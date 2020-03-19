import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';
import projects from './projects';
import tickets from './tickets';

export default combineReducers({
  alert,
  auth,
  users,
  projects,
  tickets
});
