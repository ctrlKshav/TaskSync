import React, { useState } from "react";
import "./AddNotePage.css";
import { useNavigate } from "react-router-dom";

const AddTaskPage = ({addTask}) => {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate()

  const newTask = {
    title,
    id,
    category
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!title && !id && !category){
      return;
    }
    // console.log("CheckPoint1")
    addTask(newTask)  
    navigate("/task")
    console.log(newTask)
  }


  return (
    <form onSubmit={handleSubmit}>
      <h5>Add New Task</h5>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Serial Number
        </label>
        <input
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter Task's Sr No."
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter task's title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={4}
          placeholder="Enter note's content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div> */}

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
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
          <option value="inreview">In Review</option>
          <option value="backlog">Backlog</option>
        </select>
      </div>

      <button
        className="btn btn-primary d-flex justify-content-center"
        style={{ width: "100%" }}
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskPage;
