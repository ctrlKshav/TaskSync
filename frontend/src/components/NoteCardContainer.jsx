import React from "react";
import NoteCard from "./NoteCard";

const NoteCardContainer = ({ notes }) => {
  return (
    <div className="container">
      <div className="row">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))
        ) : (
          <div className="col-12 text-center">
            <h5>No notes found.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCardContainer;
