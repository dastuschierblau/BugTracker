import axios from 'axios';
import { GET_TICKETS, TICKETS_ERROR } from './types';

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
