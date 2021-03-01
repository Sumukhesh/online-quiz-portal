import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import AdminHome from './admin/AdminHome';
import GetAllQuizzes from './admin/GetAllQuizzes';
import PrivateRoute from './auth/PrivateRoute';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Quiz from './quiz/Quiz';
import Test from './quiz/Test';
import PrevResults from './user/PrevResults';
import UserHome from './user/UserHome';




const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={UserHome}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/signin" exact component={SignIn}/>
            <PrivateRoute path="/user/home" exact component={UserHome} />
            <PrivateRoute path="/quiz" exact component={Quiz} />
            <PrivateRoute path="/admin/home" exact component={AdminHome} />
            <PrivateRoute path="/user/previous-results" exact component={PrevResults} />
            <PrivateRoute path="/admin/all-quizzes" exact component={GetAllQuizzes} />


        </Switch>
        </BrowserRouter>
    )
};

export default Routes;
