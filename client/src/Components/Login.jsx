import React from "react";
import axios from 'axios';
import Navigation from './navigation';
import {Link} from 'react-router-dom';

export default function Login(props){
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    });
    const [isChecked, setChecked] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    function handleChange(event){
        const { name, value } = event.target;

        setUser(user => {
        return {
            ...user,
            [name]: value
        };
        });
    }

    function submitCredentials(event){
        event.preventDefault();
        axios.post('/user/login', user).then(resp => {
            if (!resp.data.token){
                props.history.push('/signin');                
                setMsg(resp.data.message);
            }
            else{
                localStorage.setItem('jwt-token', resp.data.token);
                props.history.push('/');
            }   
        });
        setUser({
            username: "",
            password: ""
        });
    }
    
    if (localStorage.getItem('jwt-token')){
        props.history.push('/');
    }

    return (
        <div className="login">
    <Navigation />
    <div className="row justify-content-center m-0">
    <div className="form col-lg-3 col-md-5 col-7">
        <p className="form-heading">Sign In</p>
        <form onSubmit={submitCredentials}>
            {
                !(msg==='') && <label className="form-control error">{msg}</label>
            }
            <input type="text" name="username" value={user.username} placeholder="Username" className="form-control" onChange={handleChange} required/>
            <input type={isChecked?"text":"password"} name="password" value={user.password} placeholder="Password" className="form-control" onChange={handleChange} required/>    
            <div className="chkbx">
                <input type="checkbox" onClick={_=>setChecked(!isChecked)} className="form-check-input"/>
                <label className="form-check-lable">Show Password</label>
            </div>
            <div className="from-group text-center mt-1">
                <button className="btn btn-lg btn-outline-dark" type="submit">Sign In</button>
            </div>
            <div className="text-center mt-1">
                <Link to="/signup">Create a new account.</Link>
            </div>
        </form>
    </div>
    </div>
    </div>);
}