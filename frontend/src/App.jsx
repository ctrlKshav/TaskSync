import React from "react"
import {BrowserRouter,Routes,Route,RouterProvider,createBrowserRouter ,Navigate,createRoutesFromElements} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'


import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import AddNotePage from "./pages/AddNotePage";
import EditNotePage from "./pages/EditNotePage";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";

import axios from "axios";
import { toast } from "react-toastify";
import api from "./api"


function Logout(){
  localStorage.clear()
  return <Navigate to='/login' />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}
function App() {
  const [notes, setNotes] = useState([]);
  
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");
  const [shouldRefetch,setShouldRefetch] = useState(false)

  const handleFilterText = (val) => {
    setFilterText(val);
  };

  const handelSearchText = (val) => {
    setSearchText(val);
  };

  const filteredNotes =
    filterText === "BUSINESS"
      ? notes.filter((note) => note.category == "BUSINESS")
      : filterText === "PERSONAL"
      ? notes.filter((note) => note.category == "PERSONAL")
      : filterText === "IMPORTANT"
      ? notes.filter((note) => note.category == "IMPORTANT")
      : notes;


  useEffect(() => {
    if(searchText.length < 3) {
      
      setShouldRefetch((prev)=>!prev)
      return;}
    api.get(`/api/notes-search/?search=${searchText}`)
    .then(res => {
      console.log(res.data)
      setNotes(res.data)
    })
    .catch(err => console.log(err.message))
  }, [searchText])

  useEffect(() => {
    getNotes()
  }, [shouldRefetch]);

  const addNote = (data) => {
    api
      .post("/api/notes/", data)
      .then((res) => {
        setNotes([...notes, res.data]);
        toast.success("A new note has been added");
        console.log(res.data);
      })

      .catch((err) => {
        console.log(console.log(err.message));
      });
  };
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => {
        // console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const updateNote = (data, slug) => {
    api
      .put(`/api/notes/${slug}/`, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Note updated succesfully");
        setShouldRefetch(prev=>!prev)
      })

      .catch((err) => console.log(err.message));
  };

  const deleteNote = (slug) => {
    api
      .delete(`/api/notes/${slug}/`)
      .then(()=>getNotes())
      .catch((err) => console.log(err.message));
  };







const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route
      path="/"
      element={
        <MainLayout
          searchText={searchText}
          handelSearchText={handelSearchText}
            
        />
      }
    >
      <Route
        index
        element={
          <ProtectedRoute>
          <HomePage
            notes={filteredNotes}
            
            handleFilterText={handleFilterText}
          />
          </ProtectedRoute>
        }
      />
      <Route path="/add-note" element={<AddNotePage addNote={addNote} />} />
      <Route
        path="/edit-note/:slug"
        element={<EditNotePage updateNote={updateNote} />}
      />
      <Route
        path="/notes/:slug"
        element={<NoteDetailPage deleteNote={deleteNote} />}
      />
      
    </Route>
     <Route path="/login" element={<Login refetch={setShouldRefetch}/>}  />
     <Route path="/logout" element={<Logout />} />
     <Route path="/register" element={<RegisterAndLogout />} />
     <Route path="*" element={<NotFound />}/>
     </Route>

    
  )
);

return <RouterProvider router={router} />;
}

export default App


