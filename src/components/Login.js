import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signUpRegistaredUser } from '../redux/actions/auth.action';
import changeInput from '../redux/actions/form.action';

const Login = (props) => {
  const changeInputHandler = (event) => {
    const { onChangeInput } = props;
    const { value, name } = event.target;
    onChangeInput({ [name]: value });
  };
  const signUpUserHandler = () => {
    const { onSignUpUser } = props;
    const user = {
      email: props.state.email,
      password: props.state.password,
    };
    onSignUpUser(user);
  };
  return (
    <div className='row'>
      <div className='col s4 offset-s4'>
        <h3 className='center-align'>RealWorld</h3>
        <div className='card light-blue darken-4'>
          <div className='card-content white-text'>
            <span className='card-title'>Вход</span>
            <div>
              <div className='input-field login__input'>
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
              className='btn waves-effect waves-light orange darken-2 button__margin--right'
              onClick={signUpUserHandler}
            >
              <b>Войти</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Login.defaultProps = {
  state: {
    email: '',
    password: '',
  },
};

Login.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  onSignUpUser: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object),
};

const mapStateToProps = (state) => ({
  state: state.form,
});
const mapDispatchToProps = (dispatch) => ({
  onChangeInput: (field) => dispatch(changeInput(field)),
  onSignUpUser: (data) => dispatch(signUpRegistaredUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
