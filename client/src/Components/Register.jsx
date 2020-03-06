import React from 'react';
import axios from 'axios';
import Navigation from './navigation';
import {Link} from 'react-router-dom';

export default function Register(props){
    const [user, setUser] = React.useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: ""
    });
    const [msg, setMsg] = React.useState("");
    const [isChecked, setChecked] = React.useState(false);
    const [isClicked, setClicked] = React.useState(false);

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
        setMsg("");
        event.preventDefault();
        axios.post('/user/verify', user).then(resp => {
            if (!resp.data.message){
                setClicked(true);
            }
            else{
                setMsg(resp.data.message);
            } 
        });
        setUser({
            username: "",
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        });
    }

    return (
        <div className="body">
        <Navigation/>
        <div className="row justify-content-center">
        
        <div className="form-register col-lg-3 col-md-5 col-7">
        <p className="form-heading">{
            isClicked? "A verification link has been sent to your email address":"Sig Up"
        }</p>
        {
            !isClicked && 
            <form onSubmit={submitCredentials} autoComplete="off">
                {
                    !(msg==='') && <label className="form-control error">{msg}</label>
                }
                <input type="text" name="firstName" value={user.firstName} placeholder="First Name" className="form-control" onChange={handleChange} required/>
                <input type="text" name="lastName" value={user.lastName} placeholder="Last Name" className="form-control" onChange={handleChange}/>
                <input type="email" name="email" value={user.email} placeholder="Email" className="form-control" onChange={handleChange}/>
                <input type="text" name="username" value={user.username} placeholder="Username" className="form-control" onChange={handleChange} required/>
                <input name="password" type={isChecked? "text" : "password"} value={user.password} placeholder="Password" className="form-control" onChange={handleChange} required/>
                <div className="chkbx">
                    <input type="checkbox" onChange={_=>setChecked(!isChecked)} checked={isChecked} className="form-check-input show"/>
                    <label className="form-check-lable show" onClick={_=>setChecked(!isChecked)}>Show Password</label>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-lg btn-outline-dark">Sign Up</button>
                </div>
                <div className="text-center m-0 mt-1">
                    <Link to="/signin"><small>Already have an account?</small></Link>
                </div>
            </form>
        }
    </div>
    </div>
    </div>
    );
}