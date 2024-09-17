import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';

const MainLayout = ({searchText, handelSearchText}) => {
  return (
    <>
    <div className="d-flex flex-column ">
      
      <div>
        <NavBar searchText={searchText} handelSearchText={handelSearchText} />
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