import React from 'react';
import Navigation from './navigation';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Verify(props){
    const [details, setDetails] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [isChecked, setChecked] = React.useState(false);

    function changeDetails(event){
        setDetails(event.target.value);
    }

    function submitDetails(event){        
        event.preventDefault();
        setMsg("");
        axios({
            method: "POST",
            url: "/user/register",
            data: {
                token: props.match.params.key,
                password: details
            }
        }).then(resp=>{
            if (resp.data.message){
                setMsg(resp.data.message);
            }
            else{
                setSuccess(true);
            }
        }).catch(err=>{});
        setDetails("");
    }
    return (
        <div className="body">
            <Navigation/>
            <div className="row justify-content-center m-0">
                <div className="form col-lg-3 col-md-5 col-7">
                    <p className="form-heading">
                    {
                        !success?"Account Verification":"Account Verified"
                    }
                    </p>
                    {
                        !success?
                        <form onSubmit={submitDetails}>
                            {
                                !(msg==='') && <label className="form-control error">{msg}</label>
                            }
                            <input name="vpassword" type={isChecked?"text":"password"} className="form-control" onChange={changeDetails} value={details.password} placeholder="Enter new password" required/>
                            <div className="chkbx">
                                <input type="checkbox" onChange={_=>setChecked(!isChecked)} checked={isChecked} className="form-check-input show"/>
                                <label className="form-check-lable show" onClick={_=>setChecked(!isChecked)}>Show Password</label>
                            </div>
                            <div className="text-center mt-3">
                                <button className="btn btn-lg btn-dark">Submit</button>
                            </div>
                        </form>:
                        <div className="text-center mt-3">
                            <button className="btn btn-lg btn-dark"><Link to="/signin">Sign In</Link></button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}