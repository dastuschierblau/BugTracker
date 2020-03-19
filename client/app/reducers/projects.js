import {
  GET_PROJECTS,
  PROJECTS_ERROR,
  CREATE_PROJECT,
  SET_PROJECT,
  LOGOUT
} from '../actions/types';

let initialState = {
  projectList: [],
  project: null,
  loading: true,
  error: {}
};

export default function projects(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROJECT:
      return {
        ...state,
        projectList: state.projectList.concat([payload]),
        loading: false
      };
    case GET_PROJECTS:
      return {
        ...state,
        projectList: [...payload],
        loading: false
      };
    case SET_PROJECT:
      return {
        ...state,
        loading: false,
        project: payload
      };
    case PROJECTS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case LOGOUT:
      return {
        ...state,
        project: null
      };
    default:
      return state;
  }
}
