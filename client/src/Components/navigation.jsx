import React from 'react';
import {withRouter} from 'react-router-dom';

function Navigation(props){
    function logout(){
        localStorage.removeItem('jwt-token');
        props.history.push('/signin');
    }
    return (
        <div className="fixed-top header row">
                <div className="col-lg-11 col-md-11 col-10">
                    <a href="/" className="main-heading m-0 p-0">Notes</a>
                </div>
                {
                    props.loggedIn && 
                    <div className="col-lg-1 col-md-1 col-2">
                        <i className="fas fa-sign-out-alt logout" onClick={logout}></i>
                    </div>
                }
        </div>
    );
}

export default withRouter(Navigation);