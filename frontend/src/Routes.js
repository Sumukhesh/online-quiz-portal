import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import AdminHome from './admin/AdminHome';
import PrivateRoute from './auth/PrivateRoute';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Test from './quiz/Test'
import UserHome from './user/UserHome';


const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={SignUp}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/signin" exact component={SignIn}/>
            <PrivateRoute path="/user/home" exact component={UserHome} />
            <PrivateRoute path="/admin/home" exact component={AdminHome} />


        </Switch>
        </BrowserRouter>
    )
};

export default Routes;
