import axios from 'axios';
import { GET_TICKETS, TICKETS_ERROR, CREATE_TICKET } from './types';
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
