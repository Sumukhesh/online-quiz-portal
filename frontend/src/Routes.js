import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Test from './quiz/Test'

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Test}/>
        </Switch>
        </BrowserRouter>
    )
};

export default Routes;
