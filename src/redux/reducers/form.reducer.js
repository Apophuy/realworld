import { CHANGE_INPUT } from '../constants/actionTypes';

const initialState = {
  name: '',
  password: '',
  email: '',
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;
