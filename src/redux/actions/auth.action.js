import { LOG_IN, LOG_OUT } from '../constants/actionTypes';
import PopupMessage from '../../components/PopupMessage';

export const API_ROOT = 'https://conduit.productionready.io/api';
const url = {
  auth: `${API_ROOT}/users/login`,
  reg: `${API_ROOT}/users`,
  user: `${API_ROOT}/user`,
};

export const logInUser = (token) => ({
  type: LOG_IN,
  payload: token,
});

export const logOutUser = () => ({
  type: LOG_OUT,
});

const userToStorage = (data) => {
  const registeredUser = {
    email: data.email,
    password: data.password,
    token: data.token,
  };
  const json = JSON.stringify(registeredUser);
  localStorage.setItem('user', json);
};

export const registerUser = (data) => async (dispatch) => {
  try {
    const userData = data;
    const request = await fetch(url.reg, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: userData }),
    });
    const status = await request.status;
    if (status === 200) {
      const json = await request.json();
      const userToken = json.user.token;
      dispatch(logInUser(userToken));
      userData.token = userToken;
      PopupMessage('Пользователь зарегистрирован');
      userToStorage(userData);
    }
    if (status === 422) {
      PopupMessage('Такой пользователь уже существует');
    }
  } catch (error) {
    PopupMessage(error.message);
  }
};
// ? Получение имени пользователя из первой части
// const getUserName = (req) => async (dispatch) => {
//   const json = await req.json();
//   const userName = json.user.username;
//   dispatch(changeInput({ name: userName }));
// };

export const signUpRegistaredUser = (data) => async (dispatch) => {
  try {
    const userData = data;
    const request = await fetch(url.auth, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: userData }),
    });
    const status = await request.status;
    if (status === 200) {
      const json = await request.json();
      const userToken = json.user.token;
      dispatch(logInUser(userToken));
      userData.token = userToken;
      PopupMessage('Вы вошли в приложение');
      userToStorage(userData);
    }
    if (status === 422) {
      PopupMessage('Пароль не тот, а может пользователя не существует');
    }
  } catch (error) {
    PopupMessage(error.message);
  }
};

export const autoLogin = () => (dispatch) => {
  try {
    const json = localStorage.getItem('user');
    if (json) {
      const currentUser = JSON.parse(json);
      dispatch(signUpRegistaredUser(currentUser));
    }
  } catch (error) {
    PopupMessage(error.message);
  }
};
