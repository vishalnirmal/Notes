import React from 'react';
import axios from 'axios';
import Navigation from './navigation';
import {Link} from 'react-router-dom';

export default function Register(props){
    const [user, setUser] = React.useState({
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    });
    const [msg, setMsg] = React.useState("");

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
        // if (user.firstName !== '' && user.username !== '' && user.password !== ''){
            axios.post('/user/register', user).then(resp => {
                if (!resp.data.token){
                    setMsg(resp.data.message);
                    props.history.push('/signup');
                }
                else{
                    localStorage.setItem('jwt-token', resp.data.token);
                    props.history.push('/');
                }   
            });
            setUser({
                username: "",
                password: "",
                firstName: "",
                lastName: ""
            });
        // }
    }

    return (
        <div className="register">
        <Navigation/>
        <div className="row justify-content-center">
        
        <div className="form-register col-lg-3 col-md-5 col-7">
        <p className="form-heading">Sign Up</p>
        <form onSubmit={submitCredentials}>
            {
                !(msg==='') && <label className="form-control error">{msg}</label>
            }
            <input type="text" name="firstName" value={user.firstName} placeholder="First Name" className="form-control" onChange={handleChange} required/>
            <input type="text" name="lastName" value={user.lastName} placeholder="Last Name" className="form-control" onChange={handleChange}/>
            <input type="text" name="username" value={user.username} placeholder="Username" className="form-control" onChange={handleChange} required/>
            <input name="password" type={isChecked? "text" : "password"} value={user.password} placeholder="Password" className="form-control" onChange={handleChange} required/>
            <div className="chkbx">
                <input type="checkbox" onClick={_=>setChecked(!isChecked)} className="form-check-input"/>
                <label className="form-check-lable">Show Password</label>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-lg btn-outline-dark">Sign Up</button>
            </div>
            <div className="text-center m-0 mt-1">
                <Link to="/signin">Already have an account?</Link>
            </div>
        </form>
    </div>
    </div>
    </div>
    );
}