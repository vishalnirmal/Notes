import React from 'react';
import Navigation from './navigation';

export default function Error404(){
    return (
        <div className="body">
            <Navigation/>
            <div class="error-div">
                <p className="error-heading">404</p>
                <p className="error-message">The link you clicked may be broken or the page may have been deleted.</p>
                <br/>
                <a href="/" className="btn btn-lg btn-primary">Back to Home</a>
            </div>
            
        </div>
    );
}