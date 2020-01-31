import React from "react";

export default function Login(props){
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    });
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
    <div className="form">
        <p class="form-heading">Sign In</p>
        <form className="text-center" onSubmit={submitCredentials}>
            <div className="form-group">
                <input type="text" name="username" value={user.username} placeholder="Username" className="form-control" onChange={handleChange} required/>
            </div>
            <div className="form-group">
                <input type="text" name="password" value={user.password} placeholder="Password" className="form-control" onChange={handleChange} required/>
            </div>
            <button type="submit" className="btn btn-lg btn-outline-dark">Sign In</button>
        </form>
    </div>);
}