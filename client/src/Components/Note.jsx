import React from "react";

export default function Note(props){
    function removeNote(){
        props.onDelete(props.id);
    }
    return (
        <div class="note">
            <h1>{props.title}</h1>
            <p>{props.message}</p>
            <div class="text-right">
                <button class="button" onClick={removeNote}>Delete</button>
            </div>
        </div>
    );
}