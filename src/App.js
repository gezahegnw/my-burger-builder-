import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import UserAuthentication from './containers/UserAuth/UserAuthentication';
// import Logout from './containers/UserAuth/Logout/Logout';
import * as actions from './store/actions/actionIndex';


//this below code will situp lazy route 
const asyncCheckoutRoute = asyncComponent (() => {
  return import('./containers/Checkout/Checkout');
})
const asyncUserAuthenticationtRoute = asyncComponent (() => {
  return import('./containers/UserAuth/UserAuthentication');
})
const asyncBurgerBuilderRoute = asyncComponent (() => {
  return import('./containers/BurgerBuilder/BurgerBuilder');
})
const asyncOrdersRoute = asyncComponent (() => {
  return import('./containers/Orders/Orders');
})
const asyncLogoutRoute = asyncComponent (() => {
  return import('./containers/UserAuth/Logout/Logout');
})

class App extends Component {
componentDidMount () {
  this.props.onTryAutoSigUp();
}

  render () {
    let appRoutes  = (
      <Switch>
        <Route path="/user-authentication" component={asyncUserAuthenticationtRoute} />
        <Route path="/" exact component={asyncBurgerBuilderRoute} />
        <Redirect to="/" />
    </Switch>
    );
    if (this.props.isUserAuthenticated) {
      appRoutes = (
        <Switch>
            <Route path="/checkout" component={asyncCheckoutRoute} />
            <Route path="/orders" component={asyncOrdersRoute} />
            <Route path="/logout" component={asyncLogoutRoute } />
            <Route path="/user-authentication" component={asyncUserAuthenticationtRoute} />
            <Route path="/" exact component={asyncBurgerBuilderRoute} />
            <Redirect to="/" />
          </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {appRoutes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isUserAuthenticated: state.authReducer.token !== null
  };
};

const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSigUp: () => dispatch(actions.authCheckUserState())
    };
};

export default withRouter( connect(mapStateToProps , mapDispatchToProps) (App));
