import { useEffect, useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { FormatDate } from "../components/FormatDate";
import Modal from "../components/Modal";
import api from "../api";
import "./NoteDetailPage.css";

const NoteDetailPage = ({ deleteNote }) => {
  const [note, setNote] = useState({});
  const { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    api
      .get(`/api/notes/${slug}/`)
      .then((res) => {
        setNote(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [slug]);

  return (
    <div className="container mt-4">
      <div className="note-container bg-white p-4 rounded shadow-sm">
        <h3 className="title mb-3">{note.title}</h3>
        <div className="d-flex justify-content-between mb-3">
          <p className="note-date text-muted mb-0">
            Created: {FormatDate(note.created)}
          </p>
          <p className="note-date text-muted mb-0">
            Last Updated: {FormatDate(note.updated)}
          </p>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <Link to={`/edit-note/${slug}`} >
            <button className="btn btn-primary d-flex align-items-center">
              <FiEdit className="me-2" />
              Edit
            </button>
          </Link>
          <button className="btn btn-danger d-flex align-items-center" onClick={handleIsOpen}>
            <BiSolidTrashAlt className="me-2" />
            Delete
          </button>
        </div>
        <p className="description">{note.body}</p>
      </div>

      {isOpen && (
        <Modal
          handleIsOpen={handleIsOpen}
          deleteNote={() => deleteNote(slug)}
        />
      )}
    </div>
  );
};

export default NoteDetailPage;
