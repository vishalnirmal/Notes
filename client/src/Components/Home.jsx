import React from 'react';
import CreateNote from './createNote';
import Note from './Note';
import axios from 'axios';
import { useEffect } from 'react';
import Navigation from './navigation';

export default function Home(props){
    const [notes, setNotes] = React.useState([]);
    const token = localStorage.getItem('jwt-token');
    function fetchNotes(){
        axios.get('/note/allNotes', {
            headers: {
                "x-auth-token": token
            }
        }).then(resp => {
            setNotes(resp.data);
        });
    }
    if (!token){
        props.history.push('/signin');
    }
    
    useEffect(()=>{
        fetchNotes();
    });

    function addNote(note){
        axios({
            method: 'post',
            url: '/note/addNote',
            data: note,
            headers: {
                "x-auth-token": token
            }
          }).then(resp=>{
          });
          fetchNotes();

    }

    function deleteNote(id){
        axios({
            method: 'delete',
            url: '/note/deleteNote',
            data: {
                id
            },
            headers: {
                "x-auth-token": token
            }
          }).then(resp=>{
          });
          fetchNotes();
    }

    return (
        <div className="home">
            <Navigation loggedIn={true}/>
            <CreateNote onAdd={addNote}/>
            <div className="row m-0">
            {notes.map((noteItem, index) => {
                return (
                        <Note
                        key={noteItem._id}
                        id={noteItem._id}
                        title={noteItem.title}
                        message={noteItem.message}
                        onDelete={deleteNote}
                        />
                );
              })}
            </div>
        </div>
    );
}