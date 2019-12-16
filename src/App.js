import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import UserAuthentication from './containers/UserAuth/UserAuthentication';
import Logout from './containers/UserAuth/Logout/Logout';
import * as actions from './store/actions/actionIndex';
class App extends Component {
componentDidMount () {
  this.props.onTryAutoSigUp();
}

  render () {
    let appRoutes  = (
      <Switch>
        <Route path="/user-authentication" component={UserAuthentication} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
    </Switch>
    );
    if (this.props.isUserAuthenticated) {
      appRoutes = (
        <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/user-authentication" component={UserAuthentication} />
            <Route path="/" exact component={BurgerBuilder} />
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
