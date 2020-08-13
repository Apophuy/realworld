import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { logOutUser } from '../redux/actions/auth.action';

const Menu = (props) => {
  const { isAuthenticated } = props;
  const exitHandler = () => {
    const { logOut } = props;
    logOut();
    localStorage.clear();
  };
  let menuItems = (
    <>
      <li>
        <NavLink to='/'>Главная страница</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Войти</NavLink>
      </li>
      <li>
        <NavLink to='signup'>Зарегистрироваться</NavLink>
      </li>
    </>
  );
  if (isAuthenticated) {
    menuItems = (
      <>
        <li>
          <NavLink to='/'>Главная страница</NavLink>
        </li>
        <li>
          <NavLink to='/add'>Создать статью</NavLink>
        </li>
        <li>
          <NavLink onClick={exitHandler} to='/'>
            Выход
          </NavLink>
        </li>
      </>
    );
  }
  return (
    <nav>
      <div className='nav-wrapper deep-orange darken-3'>
        <ul className='left hide-on-med-and-down'>{menuItems}</ul>
      </div>
    </nav>
  );
};

Menu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
