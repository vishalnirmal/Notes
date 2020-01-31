import React from 'react';
import Navigation from './navigation';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from "./Home";

function App() {
    return (
        <div>
            <Navigation/>
            <Switch>
                <Route to="/" exact component={Home}/>
                <Route to="/signup" exact component={Register}/>
                <Route to="/signin" exact component={Login}/>
            </Switch>
        </div>
    );
}

export default App;
