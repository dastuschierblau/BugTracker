import { GET_TICKETS, TICKETS_ERROR } from '../actions/types';

let initialState = {
  loading: true,
  tickets: [],
  ticket: null,
  error: {}
};

export default function tickets(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: [...payload],
        loading: false
      };
    case TICKETS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
}
