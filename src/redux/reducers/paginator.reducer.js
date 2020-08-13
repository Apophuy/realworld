import { CHANGE_ACTIVE_PAGE, CHANGE_FIRST_PAGE } from '../constants/actionTypes';

const initialState = {
  firstPage: 1,
  activePage: 1,
  paginationLength: 10,
};

const paginatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    case CHANGE_FIRST_PAGE:
      return {
        ...state,
        firstPage: action.payload,
      };
    default:
      return state;
  }
};

export default paginatorReducer;
