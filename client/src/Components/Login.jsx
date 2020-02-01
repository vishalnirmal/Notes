import React from "react";
import axios from 'axios';
import Navigation from './navigation';

export default function Login(props){
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    });
    const [isChecked, setChecked] = React.useState(false);
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
            if (resp.status !== 200){
                props.history.push('/login');
            }
            else{
                localStorage.setItem('jwt-token', resp.data.token);
                props.history.push('/');
            }   
        })
    }
    
    if (localStorage.getItem('jwt-token')){
        props.history.push('/');
    }

    return (
        <div>
    <Navigation />
    <div className="form">
        <p className="form-heading">Sign In</p>
        <form onSubmit={submitCredentials}>
            <div className="form-group">
                <input type="text" name="username" value={user.username} placeholder="Username" className="form-control" onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <input type={isChecked?"text":"password"} name="password" value={user.password} placeholder="Password" className="form-control" onChange={handleChange} required/>
            </div>
            <div className="form-group chkbx">
                <input type="checkbox" onClick={_=>setChecked(!isChecked)} className="form-check-input"/>
                <label className="form-check-lable">Show Password</label>
            </div>
            <div className="from-group text-center">
                <button className="btn btn-lg btn-outline-dark" type="submit">Sign In</button>
            </div>
            <div className="text-center">
                <a href="/signup">Create a new account.</a>
            </div>
        </form>
    </div>
    </div>);
}