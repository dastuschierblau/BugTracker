import { GET_TICKETS, TICKETS_ERROR, CREATE_TICKET } from '../actions/types';

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
    case CREATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.concat([payload]),
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
