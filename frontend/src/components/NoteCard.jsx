import React from "react";
import { MdMarkunread } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FormatDate } from "./FormatDate";

const NoteCard = ({ note }) => {
  const body = `${note.body.split(" ").slice(0, 20).join(" ")} ...`;
  const color =
    note.category === "BUSINESS"
      ? "blue"
      : note.category === "PERSONAL"
      ? "green"
      : "purple";

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4 single-note-item all-category">
      <div className="card card-body shadow-sm">
        {/* Side Stick */}
        <span
          className="side-stick"
          style={{
            backgroundColor: color,
            width: "5px",
            height: "100%",
            position: "absolute",
            left: "0",
            top: "0",
          }}
        ></span>

        {/* Note Icon */}
        <FaNoteSticky
          style={{
            marginLeft: "auto",
            color: color,
            fontSize: "20px",
          }}
        />

        {/* Note Title */}
        <Link
          to={`/notes/${note.slug}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h5 className="note-title text-truncate mb-2" style={{ width: "85%" }}>
            {note.title}
          </h5>
        </Link>

        {/* Note Date */}
        <p className="note-date text-muted font-12">
          {FormatDate(note.updated)}
        </p>

        {/* Note Body */}
        <div className="note-content">
          <p className="note-inner-content text-muted">{body}</p>
        </div>

        {/* Note Footer */}
        <div className="d-flex align-items-center justify-content-between mt-2">
          {/* Unread Icon */}
          <MdMarkunread
            style={{
              fontSize: "25px",
              cursor: "pointer",
              color: color,
            }}
          />

          {/* Note Category */}
          <small className="text-muted">{note.category}</small>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
