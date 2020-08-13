import { LOG_IN, LOG_OUT } from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  token: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
export default authReducer;
