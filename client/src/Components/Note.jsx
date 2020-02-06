import React from "react";

export default function Note(props){
    const [isExpanded, setExpanded] = React.useState(false);
    var message = props.message;
    const max_lines = 4;
    const max_letters = 100;
    function removeNote(){
        props.onDelete(props.id);
    }
    function getDate(date){
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return day[date.getDay()]+", "+months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
    }
    function shorten(string){
        if(string.split('\n').length > max_lines){
            let strg = string.split('\n');
            let temp="";
            for (let i=0;i<max_lines;i++){
                if (i===max_lines-1){
                    temp+=strg[i];
                    continue;
                }
                temp+=strg[i]+'\n';
            }
            return temp;
        }
        else{
            return string.substring(0, max_letters);
        }
    }
    function expand(){
        if (message.length > max_letters || message.split('\n').length > max_lines){
            if (isExpanded){
                message = shorten(message);
                setExpanded(false);
            }
            else{
                setExpanded(true);
            }
        }
    }
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="note" onClick={expand}>
                <h3 className="title">{props.title}</h3>
                <p className="message" >
                {
                    ((message.length > max_letters || message.split('\n').length > max_lines) && !isExpanded)?shorten(message)+"...":message
                }
                </p>
                <p class="m-0">
                    <span class="footer-note">{getDate(new Date(props.created_at))}</span>
                    <i className="fas fa-trash-alt size-5x button" onClick={removeNote}></i>
                </p>
            </div>
        </div>
    );
}