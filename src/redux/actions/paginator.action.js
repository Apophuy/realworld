import { CHANGE_ACTIVE_PAGE, CHANGE_FIRST_PAGE } from '../constants/actionTypes';

export const changeActivePage = (pageNumber) => ({
  type: CHANGE_ACTIVE_PAGE,
  payload: pageNumber,
});

export const changeFirstPage = (pageNumber) => ({
  type: CHANGE_FIRST_PAGE,
  payload: pageNumber,
});
