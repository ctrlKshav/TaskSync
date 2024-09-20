import React from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  console.log(props)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <h4 className="mb-0" style={{ fontWeight: "bold" }}>TaskSync</h4>
        </Link>

        {/* Title */}
        <div className="d-flex flex-grow-1 justify-content-center">
          <h2 className="mb-0">{props.props.title}</h2>
        </div>

        {/* Button */}
        {props.props.bool?<Link to='/add-task' className="btn btn-primary">
          <FaSquarePlus className="me-2" />
          Add Task
        </Link>:<></>}
        
      </div>
    </nav>
  );
};

export default NavBar;
