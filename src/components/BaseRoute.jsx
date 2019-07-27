import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const BaseRoute = () => (
  <Fragment>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
    </Switch>
  </Fragment>
);

export default BaseRoute;
