import React from "react";

export default function Note(props){
    function removeNote(){
        props.onDelete(props.id);
    }
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="note">
                <h3 className="title">{props.title}</h3>
                <p className="message">{props.message}</p>
                <div className="mt-1 text-right">
                    <i className="fas fa-trash-alt size-5x button" onClick={removeNote}></i>
                </div>
            </div>
        </div>
    );
}