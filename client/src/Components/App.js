import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from "./Home";

function App() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" component={Register}/>
                <Route path="/signin" component={Login}/>
            </Switch>
        </div>
    );
}

export default App;
