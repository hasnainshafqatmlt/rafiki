import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Main from '../components/Main';

import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import NotFound from '../components/NotFound';


const Root = () => {
  return (
    <Switch>
      <Main>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
      </Main>

      <Route path="*" component={NotFound} status={404} />

    </Switch>
  );
};

export default Root;
