import React from 'react';
import CreateNote from './createNote';
import Note from './Note';

export default function Home(props){
    const [notes, setNotes] = React.useState([]);

    function addNote(note){
        setNotes(notes=>{
            return [
                ...notes,
                note
            ];
        });
    }

    function deleteNote(id){
        setNotes(notes=>{
            return notes.filter((note, index)=>{
                return index !== id;
            });
        });
    }

    return (
        <div className="Home">
            <CreateNote onAdd={addNote}/>
            <div class="row">
            {notes.map((noteItem, index) => {
                return (
                    <div class="col-3">
                        <Note
                        key={index}
                        id={index}
                        title={noteItem.title}
                        message={noteItem.message}
                        onDelete={deleteNote}
                        />
                    </div>
                );
              })}
            </div>
        </div>
    );
}