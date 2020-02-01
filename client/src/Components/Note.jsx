import React from "react";

export default function Note(props){
    function removeNote(){
        props.onDelete(props.id);
    }
    return (
        <div className="col-3">
            <div className="note">
                <h1>{props.title}</h1>
                <p>{props.message}</p>
                <div className="text-right">
                    <button className="button" onClick={removeNote}>Delete</button>
                </div>
            </div>
        </div>
    );
}