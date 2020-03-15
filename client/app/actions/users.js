import axios from 'axios';
import { GET_USERS, LOAD_ERROR, EDIT_USER } from './types';

const baseUrl = process.env.NEXT_STATIC_BASE_URL || 'http://localhost:5000';

// Get all users from database to display in table
export const getUsers = () => async dispatch => {
  try {
    let res = await axios.get(`${baseUrl}/api/users`);

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOAD_ERROR
    });
  }
};

export const editUser = ({ target, value }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ target, value });

  try {
    let res = await axios.post(`${baseUrl}/api/users/edit`, body, config);

    dispatch({
      type: EDIT_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOAD_ERROR
    });
  }
};
