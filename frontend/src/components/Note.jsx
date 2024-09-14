import React from "react";
import '../styles/Note.css'

function Note({note,onDelete}){
    const formattedDate = new Date(note.created).toLocaleDateString('en-us')

    return (
        <>
            <div className='note-container'>
                <h6 className="note-title">{note.title}</h6>
                <p className="note-content">{note.content}</p>
                <p className="note-date">{formattedDate}</p>
                <button className="delete-button" onClick={()=>onDelete(note.id)}>Delete</button>
            </div>
        </>
    )
}

export default Note;    