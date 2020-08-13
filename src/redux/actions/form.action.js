import { CHANGE_INPUT } from '../constants/actionTypes';

const changeInput = (field) => ({
  type: CHANGE_INPUT,
  payload: field,
});

export default changeInput;
