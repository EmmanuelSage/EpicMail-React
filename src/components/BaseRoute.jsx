import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MediaQuery from './MediaQuery';

const BaseRoute = () => (
  <Fragment>
    <MediaQuery/>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
  </Fragment>
);

export default BaseRoute;
