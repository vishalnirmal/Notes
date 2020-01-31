import React from 'react';

export default function Register(props){
    const [user, setUser] = React.useState({
        username: "",
        password: "",
        firstName: "",
        lastName: ""
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

    function submitCredentials(){

    }

    return (
    <div className="form-register">
        <p class="form-heading">Sign Up</p>
        <form onSubmit={submitCredentials}>
            <div className="form-group">
                <input type="text" name="firstName" value={user.firstName} placeholder="First Name" className="form-control" onChange={handleChange} required/>
            </div>  
            <div className="form-group">
                <input type="text" name="lastName" value={user.lastName} placeholder="Last Name" className="form-control" onChange={handleChange}/>
            </div>  
            <div className="form-group">
                <input type="text" name="username" value={user.username} placeholder="Username" className="form-control" onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <input name="password" type={isChecked? "text" : "password"} value={user.password} placeholder="Password" className="form-control" onChange={handleChange} required/>
            </div>
            <div class="form-group chkbx">
                <input type="checkbox" onClick={_=>setChecked(!isChecked)} className="form-check-input"/>
                <label class="form-check-lable">Show Password</label>
            </div>
            <div className="form-group text-center">
                <button type="submit" className="btn btn-lg btn-outline-dark">Sign Up</button>
            </div>
        </form>
    </div>
    );
}