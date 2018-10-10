import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DetailedView from './Components/DetailedView/DetailedView';
import Main from './Components/Main/Main';


export default (
    <Switch>
        <Route exact path='/' component={Main}></Route>
        <Route path='/detailedview/:id' component={DetailedView}></Route>
    </Switch>
)