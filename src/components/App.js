import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'materialize-css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Menu from './Menu';
import { autoLogin } from '../redux/actions/auth.action';
import ViewArticle from './articles/ViewArticle';
import EditArticle from './articles/EditArticle';

class App extends Component {
  componentDidMount() {
    const { autoSignIn } = this.props;
    autoSignIn();
  }

  render() {
    const { isAuthenticated } = this.props;
    let routes = (
      <>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Register} />
        <Route exact path='/' component={Home} />
        <Redirect to='/signup' />
      </>
    );

    if (isAuthenticated) {
      routes = (
        <>
          <Route exact path='/' component={Home} />
          <Route path='/add' component={EditArticle} />
          <Route path='/articles/:slug/edit' component={EditArticle} />
          <Route exact path='/articles/:slug' component={ViewArticle} />
          <Redirect to='/' />
        </>
      );
    }
    return (
      <div className='container app__container'>
        <Menu />
        <Switch>{routes}</Switch>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  autoSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = (dispatch) => ({
  autoSignIn: () => dispatch(autoLogin()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
