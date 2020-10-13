import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import CreateUser from './pages/CreateUser';
import Pagina_Inicial from './pages/Pagina_Inicial';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/admin" component={Dashboard} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/users" component={CreateUser} />
            <Route exact path="/" component={Pagina_Inicial} />
        </Switch>
    </Router>
);

export default Routes;