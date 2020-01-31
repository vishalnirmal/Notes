import React from 'react';

export default function Navigation(props){
    return (
        <div className="header">
            <div className="row">
                <div className="col-10">
                    <a href="/" className="main-heading"><p>Notes</p></a>
                </div>
                <div className="col-2 text-center">
                <a href="/login" className="login"><p>login</p></a>
                </div>
            </div>
        </div>
    );
}