import { useEffect, useState } from "react";
import "./AddNotePage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../api";

const EditTaskPage = ({updateTask}) => {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");

  const { pk } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    api
      .get(`/api/tasks/${pk}/`)
      .then((res) => {
        // console.log(res.data);
        setTitle(res.data.title);
        setId(res.data.id)
        setCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [pk]);

  const updateTaskObject  = {
    title,
    id,
    category
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!title && !id && !category) return;
    
    updateTask(updateTaskObject, pk)
    navigate(`/task`)
  }


  return (
    <form onSubmit={handleSubmit}>
      <h5>Update Task</h5>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter note's title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Task's category
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          value={category}
          style={{ height: "40px" }}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Pick a category</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
          <option value="inreview">In Review</option>
          <option value="backlog">Backlog</option>
        </select>
      </div>

      <button
        className="btn btn-primary d-flex justify-content-center"
        style={{ width: "100%" }}
      >
        Update Task
      </button>
    </form>
  );
};

export default EditTaskPage;
