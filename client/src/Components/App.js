import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from "./Home";
import Footer from './Footer';
import Error404 from './Error404';
import ForgotPassword from './forgotPassword';

function App() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" component={Register}/>
                <Route path="/signin" component={Login}/>
                <Route path="/forgot_password" component={ForgotPassword}/>
                <Route path="" component={Error404}/>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
