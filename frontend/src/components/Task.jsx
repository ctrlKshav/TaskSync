import React from "react";
import '../styles/Task.css'

function Task({task,onDelete}){
    const formattedDate = new Date(task.created).toLocaleDateString('en-us')

    return (
        <>
            <div className='note-container'>
                <h6 className="note-title">{task.title}</h6>
                <p className="note-content">{task.category}</p>
                <p className="note-date">{formattedDate}</p>
                <button className="delete-button" onClick={()=>onDelete(task.id)}>Delete</button>
            </div>
        </>
    )
}

export default Task; 