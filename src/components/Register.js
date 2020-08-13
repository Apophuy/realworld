import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../redux/actions/auth.action';
import changeInput from '../redux/actions/form.action';

const Register = (props) => {
  const changeInputHandler = (event) => {
    const { onChangeInput } = props;
    const { value, name } = event.target;
    onChangeInput({ [name]: value });
  };

  const registerHandler = () => {
    const { onRegisterUser } = props;
    const user = {
      username: props.state.name,
      email: props.state.email,
      password: props.state.password,
    };
    onRegisterUser(user);
  };

  return (
    <div className='row'>
      <div className='col s4 offset-s4'>
        <h3 className='center-align'>RealWorld</h3>
        <div className='card light-blue darken-4'>
          <div className='card-content white-text'>
            <span className='card-title'>Регистрация</span>
            <div>
              <div className='input-field  login__input'>
                <input
                  name='name'
                  id='user_name'
                  type='text'
                  className='validate'
                  onChange={changeInputHandler}
                />
                <label htmlFor='user_name'>Имя пользователя</label>
              </div>
              <div className='input-field  login__input'>
                <input
                  name='email'
                  id='user_email'
                  type='email'
                  className='validate'
                  onChange={changeInputHandler}
                />
                <label htmlFor='user_email'>Адрес электронной почты</label>
              </div>
              <div className='input-field  login__input'>
                <input
                  name='password'
                  id='user_password'
                  type='password'
                  className='validate'
                  onChange={changeInputHandler}
                />
                <label htmlFor='user_password'>Пароль</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              type='button'
              className='btn waves-effect waves-light green lighten-1 black-text button__margin--right'
              onClick={registerHandler}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Register.defaultProps = {
  state: {
    name: '',
    password: '',
    email: '',
  },
};

Register.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object),
  onRegisterUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  state: state.form,
});
const mapDispatchToProps = (dispatch) => ({
  onChangeInput: (field) => dispatch(changeInput(field)),
  onRegisterUser: (user) => dispatch(registerUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
