import axios from 'axios';
import {
  GET_PROJECTS,
  PROJECTS_ERROR,
  CREATE_PROJECT,
  SET_PROJECT
} from './types';
import { setAlert } from './alert';

const baseUrl = process.env.NEXT_STATIC_BASE_URL || 'http://localhost:5000';

// Get all projects to display in list:
export const getProjects = () => async dispatch => {
  try {
    let res = await axios.get(`${baseUrl}/api/projects`);

    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createProject = (
  { name, description },
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let body = JSON.stringify({ name, description });

  try {
    let res = await axios.post(`${baseUrl}/api/projects`, body, config);

    dispatch({
      type: CREATE_PROJECT,
      payload: res.data
    });

    dispatch(setAlert('Project Created', 'success'));

    history.push('/projects');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROJECTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const setProject = projectId => async dispatch => {
  try {
    let res = await axios.get(`${baseUrl}/api/projects/${projectId}`);

    dispatch({
      type: SET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
