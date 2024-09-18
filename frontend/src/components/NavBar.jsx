import React from 'react'
import { FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav className="navbar bg-body-tertiary py-50" style={{ padding: "20px" }}>
      <div className="container d-flex justify-content-space-between">
        <Link className="navbar-brand " to="/">
          <h4 style={{ fontWeight: "bold" }} >TaskSync</h4>
        </Link>
       

       <div>
        <h2>Progress Board</h2>
       </div>

        <Link to="/add-task"  style={{ textDecoration: "none" }}>
        <button
            className="btn btn-outline-primary btn-md"
            type="button"
           
          >
            <FaSquarePlus className="me-2 fs-6" /> Add Task
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar