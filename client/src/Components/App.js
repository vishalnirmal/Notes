import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from "./Home";
import Footer from './Footer';

function App() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" component={Register}/>
                <Route path="/signin" component={Login}/>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
