import React from 'react'
import NavBar from '../components/SearchBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar'

const MainLayout = ({searchText, handelSearchText}) => {
  return (
    <>
    <div className="d-flex flex-column ">
      
      <div>
        <SearchBar searchText={searchText} handelSearchText={handelSearchText} />
      </div>
      {/* <ToastContainer /> */}
      <div className='d-flex'>
      <Sidebar />
      <Outlet />
      </div>
    </div>
    </>
  )
}

export default MainLayout