import { useEffect, useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./TaskDetailPage.css";
import axios from "axios";
import { FormatDate } from "../components/FormatDate";
import Modal from "../components/Modal";
import api from "../api";

const TaskDetailPage = () => {
  const [task, setTask] = useState({});
  const { pk } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // To navigate back after deletion

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    api
      .get(`/api/tasks/${pk}/`)
      .then((res) => {
        setTask(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [pk]);

  const deleteTask = () => {
    api
      .delete(`/api/tasks/${pk}/`)
      .then(() => {
        console.log("Task deleted successfully");
        navigate("/task"); // Redirect after deletion
      })
      .catch((err) => {
        console.log("Error deleting task:", err.message);
      });
  };

  return (
    <>
      <div className="note-container">
        <h3 className="title">{task.title}</h3>
        <span className="d-flex justify-content-center">
          <p className="note-date font-12 text-muted me-5">
            Created: {FormatDate(task.created)}
          </p>
        </span>
        <span className="button-group">
          <Link to={`/edit-task/${pk}`}>
            <button className="btn btn-primary">
              <FiEdit />
              <span>Edit</span>
            </button>
          </Link>

          <button className="btn btn-danger" onClick={handleIsOpen
          }>
            <BiSolidTrashAlt />
            <span>Delete</span>
          </button>
        </span>
        <p className="description">{task.category}</p>
      </div>

      {isOpen && (
        <Modal
          handleIsOpen={handleIsOpen}
          deleteNote={deleteTask} // Pass the deleteTask function to the modal
        />
      )}
    </>
  );
};

export default TaskDetailPage;
