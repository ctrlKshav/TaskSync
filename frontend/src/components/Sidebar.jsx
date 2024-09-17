// Sidebar.js
import React from 'react';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column vh-100 bg-dark" style={{ width: '250px', left: 0, top: 0 }}>
          
            <ul className="nav flex-column px-2">
                
                <li className="nav-item mb-2">
                    <a className="nav-link" href="/">Notes</a>
                </li>
                <li className="nav-item mb-2">
                    <a className="nav-link" href="/task">Tasks</a>
                </li>
                <li className="nav-item mb-2">
                    <a className="nav-link" href="/logout">Logout</a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
