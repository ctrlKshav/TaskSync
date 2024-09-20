import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";

function getBgColor(isDragging, isBacklog) {
    if (isDragging) return "bg-success text-white";
    if (isBacklog) return "bg-danger text-white";
    return "bg-light";
}

export default function Card({ task, index }) {
    let navigate = useNavigate();

    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    onDoubleClick={() => navigate(`/tasks/${task.id}`)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`card mb-3 p-3 ${getBgColor(snapshot.isDragging, task.isBacklog)}`}
                >
                    <div className="d-flex justify-content-between">
                        <small className="text-muted">#{task.id}</small>
                    </div>
                    <div className="text-center">
                        <h5 className="card-title">{task.title}</h5>
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    );
}
