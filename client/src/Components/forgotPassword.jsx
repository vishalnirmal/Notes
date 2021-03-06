import React from "react";
import Navigation from "./navigation";
import axios from "axios";
import {Link} from "react-router-dom";

export default function ForgotPassword(props){
    const [details, setDetails] = React.useState({
        username: "",
        email: ""
    });
    const [msg, setMsg] = React.useState("");
    const [success, setSuccess] = React.useState(false);
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
        axios({
            method: 'post',
            url: 'user/forgot_password',
            data: details,
          }).then(resp=>{
              if (resp.data.message){
                  setMsg(resp.data.message);
              }
              else{
                setSuccess(true);
              }
          }).catch(err =>{
            console.log(err);
          });
        setDetails({
            username: "",
            email: ""
        });
        event.preventDefault();
    }
    return (
        <div className="body">
            <Navigation/>
            <div className="row justify-content-center m-0">
                <div className="form col-lg-3 col-md-5 col-7">
                    <p className="form-heading">{!success?"Forgot Password":"Link successfully mailed"}</p>
                    {
                        !(msg==='') && <label className="form-control error">{msg}</label>
                    }
                    {
                        !success && 
                        <form onSubmit={submitDetails}>
                            <input name="username" type="text" className="form-control" onChange={changeDetails} value={details.username} placeholder="Username" required/>
                            <input name="email" type="text" className="form-control" onChange={changeDetails} value={details.email} placeholder="Email" required/>
                            <div className="text-center mt-3">
                                <button className="btn btn-lg btn-dark">Submit</button>
                            </div>
                            <div className="text-center mt-1 row">
                                <div class="col-6">
                                    <Link to="/signin"><small>Sign In</small></Link>
                                </div>
                                <div class="col-6">
                                    <Link to="/signup"><small className="form-text">Sign Up</small></Link>    
                                </div>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
}