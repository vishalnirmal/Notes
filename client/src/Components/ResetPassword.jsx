import React from "react";
import Navigation from './navigation';
import axios from 'axios';

export default function ResetPassword(props){
    const [details, setDetails] = React.useState({
        password: "",
        tpassword: ""
    });
    const [msg, setMsg] = React.useState("");
    function changeDetails(event){
        const { name, value } = event.target;
        setDetails(details=>{
            return {
                ...details,
                [name]: value
            };
        });
    }
    function submitDetails(event){
        setMsg("");
        if (details.password === details.tpassword){
            axios({
                method: "POST",
                url: "/user/reset_password",
                headers: {
                    'x-auth-token': props.match.params.key
                },
                data: {
                    'password': details.password
                }
            }).then(resp=>{
                if (resp.status === 200){
                    props.history.push('/signin');
                }
            }).catch(err=>{

            });
        }
        else{
            setMsg("Password does not match.");
        }
        event.preventDefault();
    }
    return (
        <div className="body">
            <Navigation/>
            <div className="row justify-content-center m-0">
                <div className="form col-lg-3 col-md-5 col-7">
                    <p className="form-heading">Reset Password</p>
                    {
                        !(msg==='') && <label className="form-control error">{msg}</label>
                    }
                    <form onSubmit={submitDetails}>
                        <input name="password" type="password" className="form-control" onChange={changeDetails} value={details.password} placeholder="Enter new password" required/>
                        <input name="tpassword" type="password" className="form-control" onChange={changeDetails} value={details.tpassword} placeholder="Re-enter new password" required/>
                        <div className="text-center mt-3">
                            <button className="btn btn-lg btn-dark">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}