import React from "react";
import Card from "./Card";
import { Droppable } from "@hello-pangea/dnd";

export default function Column({ title, tasks, id }) {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex flex-column vh-100 ">
            <div
                className="card h-100 border-0 shadow-sm flex-grow-1"
                style={{ height: "100%", overflowY: "scroll", minWidth: "250px" }} // Adjust minWidth here
            >
                <h3
                    className="card-header bg-primary text-white text-center sticky-top"
                    style={{ zIndex: 1 }}
                >
                    {title}
                </h3>
                <Droppable droppableId={id}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`card-body p-2 ${snapshot.isDraggingOver ? "bg-light" : ""}`}
                            style={{ minHeight: "100px" }}
                        >
                            {tasks.map((task, index) => (
                                <Card key={index} index={index} task={task} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
}
