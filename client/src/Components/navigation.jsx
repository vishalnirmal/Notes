import React from 'react';
import {withRouter} from 'react-router-dom';

function Navigation(props){
    function logout(){
        localStorage.removeItem('jwt-token');
        props.history.push('/signin');
    }
    return (
        <div className="header">
            <div className="row">
                <div className="col-11">
                    <a href="/" className="main-heading"><p>Notes</p></a>
                </div>
                {
                    props.loggedIn && 
                    <div className="col-1 text-center">
                        <i className="fas fa-sign-out-alt logout" onClick={logout}></i>
                    </div>
                }
            </div>
        </div>
    );
}

export default withRouter(Navigation);