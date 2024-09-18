import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import api from '../api'
import { createGlobalStyle } from "styled-components";
export default function Board({taskRefetch}) {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [inReview, setInReview] = useState([]);
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        getTasks()
    }, [taskRefetch]);

    const getTasks = () => {
        api
        .get("/api/tasks/")
        .then((response) => {
            let json=response.data
            setCompleted(json.filter((task) => task.category === "completed"));
            setIncomplete(json.filter((task) => task.category === "incomplete"));
            setBacklog(json.filter((task) => task.category === "backlog"));
            setInReview(json.filter((task) => task.category === "inreview"));
            setTasks(response.data)
        })
        .catch((err)=>console.log(err))

    }

    const updateLocalState = (taskId, sourceDroppableId, destinationDroppableId) => {
        const task = findItemById(taskId, [...incomplete, ...completed, ...inReview, ...backlog]);
    
        // Remove the task from its original column
        deletePreviousState(sourceDroppableId, taskId);
    
        // Add the task to the new column based on the destination
        switch (destinationDroppableId) {
            case "1":
                setIncomplete([task, ...incomplete]);
                break;
            case "2":
                setCompleted([task, ...completed]);
                break;
            case "3":
                setInReview([task, ...inReview]);
                break;
            case "4":
                setBacklog([task, ...backlog]);
                break;
        }
    };
    
    const updateTasks = (pk,data) => {
        // console.log(data)
        let updatedTask={id:data.id,title:data.title,category:data.category}
        // console.log(updatedTask)
        api
            .put(`/api/tasks/update/${pk}/`,updatedTask)
            .then(()=>{getTasks()})
            .catch((err)=>console.log(err))

    }


    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;
        
        // deletePreviousState(source.droppableId, draggableId);
        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);
        updateLocalState(task.id, source.droppableId, destination.droppableId);
        console.log(task)
        // setNewState(destination.droppableId, task);


        let destinationName;
        switch(destination.droppableId){
            case "1":
                destinationName = "incomplete"
                break;
            case "2":
                destinationName = "completed"
                break;
            case "3":
                destinationName = "inreview"
                break;
            case "4":
                destinationName = "backlog"
                break;                    
        }
        
        updateTasks(task.id,{...task,category:destinationName})







    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(removeItemById(taskId, incomplete));
                break;
            case "2":
                setCompleted(removeItemById(taskId, completed));
                break;
            case "3":
                setInReview(removeItemById(taskId, inReview));
                break;
            case "4":
                setBacklog(removeItemById(taskId, backlog));
                break;
        }

    }
    function setNewState(destinationDroppableId, task) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // TO DO
                task.category = "incomplete"
                // updatedTask = { ...task, completed: false };
                // setIncomplete([updatedTask, ...incomplete]);
                break;
            case "2":  // DONE
                task.category = "completed"

                // updatedTask = { ...task, completed: true };
                // setCompleted([updatedTask, ...completed]);
                break;
            case "3":  // IN REVIEW
                task.category = "inreview"

                // updatedTask = { ...task, completed: false };
                // setInReview([updatedTask, ...inReview]);
                break;
            case "4":  // BACKLOG
                task.category = "backlog"

                // updatedTask = { ...task, completed: false };
                // setBacklog([updatedTask, ...backlog]);
                break;
            getTasks()
        }
    }
    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    return (
        <div className="App">
        <DragDropContext onDragEnd={handleDragEnd}>
        
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "1300px",
                    margin: "0 auto"
                }}
            >
                <Column title={"TO DO"} tasks={incomplete} id={"1"} />
                <Column title={"DONE"} tasks={completed} id={"2"} />
                <Column title={"IN REVIEW"} tasks={inReview} id={"3"} />
                <Column title={"BACKLOG"} tasks={backlog} id={"4"} />
            </div>
        </DragDropContext>
        </div>
    );
}