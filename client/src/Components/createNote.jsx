import React from 'react';

export default function CreateNote(props){
    const [note, setNote] = React.useState({
        title: "",
        message: ""
    });
    const [isClicked, setClicked] = React.useState(false);
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
        if (!(note.message === '')){
            event.preventDefault();
            props.onAdd(note);
            setNote({
                title:"",
                message:""
            });
            setClicked(false);
        }
    }
    return (
        <div className="row justify-content-center m-0">
                <div className="col-lg-4 col-md-6 col-11 m-0 create-note">
                    <form>
                        {
                            isClicked && 
                            <input type="text" name="title" className="form-control" value={note.title} placeholder="Title" onChange={handleChange} />
                        }
                        <textarea name="message" rows={isClicked?"4":"1"} className="form-control" value={note.message} onChange={handleChange} onClick={()=>{setClicked(true);}} placeholder="Your Note" required/>
                        {
                            isClicked &&
                            <div className="mt-2 text-right">
                                <i onClick={onSubmit} class="fas fa-plus-circle button"></i>
                            </div>
                        }
                    </form>
                </div>
        </div>
    );
}