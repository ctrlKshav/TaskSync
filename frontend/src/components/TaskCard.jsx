import React from 'react'
import { MdMarkunread } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom"
import { FormatDate } from './FormatDate';


const TaskCard = ({task}) => {

  const body = `${task.body.split(" ").slice(0, 20).join(" ")} ...`
  const color = task.category == "BUSINESS" ? "blue" : task.category == "PERSONAL" ? "green" : "purple"

  return (
    <div className="col-md-4 single-note-item all-category">
      <div className="card card-body">
        <span className="side-stick" style={{ backgroundColor: color }}></span>
        <FaNoteSticky style={{ marginLeft: "auto", color: color }} />
        <Link to={`/notes/${task.slug}`} style={{textDecoration: "none", color: "black"}}>
        <h5
          className="note-title text-truncate w-75 mb-0"
          data-noteheading="Book a Ticket for Movie"
        >
          {task.title}
        </h5>
        </Link>
        
        <p className="note-date font-12 text-muted">{FormatDate(task.updated)}</p>
        <div className="note-content">
          <p
            className="note-inner-content text-muted"
            data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis."
          >
           {body}
          </p>
        </div>
        <div className="d-flex align-items-center">
       

          <span className="d-flex justify-contents-around">
            <a href="/notes-detail">
              <MdMarkunread
                style={{ fontSize: "25px", cursor: "pointer", color: color }}
              />
            </a>

            <small className="text-muted">{task.category}</small>
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard