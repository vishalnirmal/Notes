import React from "react";
import Navigation from "./navigation";
import axios from "axios";

export default function ForgotPassword(props){
    const [details, setDetails] = React.useState({
        username: "",
        email: ""
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
        axios({
            method: 'post',
            url: 'user/forgot_password',
            data: details,
          }).then(resp=>{
              console.log(resp);
            //   if (resp.status === 200){
            //   }
            //   else{
            //       setMsg("Sorry, didn't find any account matching entered details");
            //   }
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
        <div class="body">
            <Navigation/>
            <div className="row justify-content-center m-0">
                <div className="form col-lg-3 col-md-5 col-7">
                    <form onSubmit={submitDetails}>
                        {
                            !(msg==='') && <label className="form-control error">{msg}</label>
                        }
                        <h4 class="text-center mb-4">Forgot Password</h4>
                        <input name="username" type="text" class="form-control" onChange={changeDetails} value={details.username} placeholder="Username" required/>
                        <input name="email" type="text" class="form-control" onChange={changeDetails} value={details.email} placeholder="Email" required/>
                        <div class="text-center mt-3">
                            <button class="btn btn-lg btn-dark">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}