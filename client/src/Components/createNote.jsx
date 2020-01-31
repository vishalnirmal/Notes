import React from 'react';

export default function CreateNote(props){
    const [note, setNote] = React.useState({
        title: "",
        message: ""
    });
    function handleChange(event){
        const {name, value} = event.target;
        setNote(note=>{
            return {
                ...note,
                [name]: value
            };
        });
    }
    function onSubmit(event){
        event.preventDefault();
        props.onAdd(note);
        setNote({
            title:"",
            message:""
        });
    }
    return (
        <div className="create-note">
            <form>
                <div className="form-group">
                    <input type="text" name="title" className="form-control" value={note.title} placeholder="Title" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <textarea name="message" rows="2" className="form-control" value={note.message} onChange={handleChange} placeholder="Your Note" required/>
                </div>
                <div className="text-right">
                    <button className="text-right button" type="submit" onClick={onSubmit}>Add</button>
                </div>
            </form>
        </div>
    );
}