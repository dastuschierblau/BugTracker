import { GET_USERS, LOAD_ERROR, EDIT_USER, LOGOUT } from '../actions/types';

const initialState = {
  loading: true,
  users: [],
  idToName: {},
  error: {}
};

export default function users(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: [...payload],
        idToName: payload.reduce((group, item) => {
          group[item._id] = item.name;
          return group;
        }, {}),
        loading: false
      };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map(item => {
          return item._id === payload.targetUser._id
            ? payload.targetUser
            : item;
        })
      };
    case LOGOUT:
      return {
        ...initialState
      };
    case LOAD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
