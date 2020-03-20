import axios from 'axios';
import {
  GET_TICKETS,
  TICKETS_ERROR,
  CREATE_TICKET,
  SET_TICKET,
  EDIT_TICKET,
  ADD_COMMENT,
  COMMENT_ERROR
} from './types';
import { setAlert } from './alert';

const baseUrl = process.env.NEXT_STATIC_BASE_URL || 'http://localhost:5000';

// Get all tickets for a project:
export const getTickets = projectId => async dispatch => {
  try {
    let res = await axios.get(`${baseUrl}/api/projects/${projectId}/tickets`);

    dispatch({
      type: GET_TICKETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKETS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all tickets for all projects
export const getAllTickets = () => async dispatch => {
  try {
    let res = await axios.get(`${baseUrl}/api/projects/tickets`);

    dispatch({
      type: GET_TICKETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKETS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Set a ticket as current ticket:
export const setTicket = ticket => dispatch => {
  dispatch({
    type: SET_TICKET,
    payload: ticket
  });
};

// PUT api/tickets/:ticket_id
// Edit a ticket:
export const editTicket = (ticketId, values) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let body = JSON.stringify(values);

  try {
    let res = await axios.put(
      `${baseUrl}/api/projects/tickets/${ticketId}`,
      body,
      config
    );

    dispatch({
      type: EDIT_TICKET,
      payload: res.data
    });

    dispatch(setAlert('Ticket edited', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));

    dispatch({
      type: TICKETS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create a ticket:
export const createTicket = (
  { description, category, priority, status, assignedTo },
  history,
  projectId
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let body = JSON.stringify({
    description,
    category,
    priority,
    status,
    assignedTo
  });

  try {
    let res = await axios.post(
      `${baseUrl}/api/projects/${projectId}`,
      body,
      config
    );

    dispatch({
      type: CREATE_TICKET,
      payload: res.data
    });

    dispatch(setAlert('Ticket created', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));

    dispatch({
      type: TICKETS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add a comment to a ticket:
export const addComment = (ticketId, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ text });

  try {
    let res = await axios.post(
      `${baseUrl}/api/projects/tickets/${ticketId}/comments`,
      body,
      config
    );

    console.log(res.data);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));

    dispatch({
      type: SET_TICKET,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));

    dispatch({
      type: COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
