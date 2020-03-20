import {
  GET_TICKETS,
  TICKETS_ERROR,
  CREATE_TICKET,
  SET_TICKET,
  EDIT_TICKET,
  ADD_COMMENT,
  COMMENT_ERROR,
  LOGOUT
} from '../actions/types';

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
    case SET_TICKET:
      return {
        ...state,
        ticket: payload
      };
    case EDIT_TICKET:
      return {
        ...state,
        tickets: state.tickets.map(item => {
          return item._id === payload._id ? payload : item;
        }),
        ticket: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        ticket: {
          ...state.ticket,
          comments: comments.concat([payload])
        },
        loading: false
      };
    case TICKETS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case COMMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
