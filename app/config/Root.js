import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Main from '../components/Main';

import Login from '../components/Login/Login';
import Logout from '../components/Logout/Logout';
import Members from '../components/Members/Members';
import Profile from '../components/Profile/Profile';
import DemoDay from '../components/DemoDay/DemoDay';
import Networks from '../components/Networks/Networks';
import Startups from '../components/Startups/Startups';
import Advisors from '../components/Advisors/Advisors';
import Opportunities from '../components/Opportunities/Opportunities';

import NotFound from '../components/NotFound';

import RegisterStepOne from '../components/Register/StepOne/StepOne';



const Root = () => {
  return (
    <Switch>
      <Main>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/login' component={Login}/>
		<Route path="/logout" component={Logout} />

		<Route path="/register" component={RegisterStepOne} />
		<Route path="/register/step-2" component={RegisterStepOne} />
		<Route path="/register/success" component={Login} />
		<Route path="/register/pt" component={Login} />
		<Route path="/request-invitation" component={Login} />

		<Route path="/:name/new-password" component={Login} />


        <Route path="/demo-day" component={DemoDay} />

		<Route path="/members" component={Members} />
        <Route path="/networks" component={Networks} />
        <Route path="/startups" component={Startups} />
        <Route path="/advisors" component={Advisors} />
        <Route path='/p/:username' component={Profile}/>
        <Route path="/startups/my" component={Startups} />

        <Route path="/opportunities" component={Opportunities} />

      </Main>

      <Route path="*" component={NotFound} status={404} />

    </Switch>
  );
};

export default Root;
