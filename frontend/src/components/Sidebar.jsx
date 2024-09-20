import React from 'react';
import { Link } from 'react-router-dom';
import { FaStickyNote, FaTasks, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column vh-100 bg-light text-dark p-3" style={{ width: '250px', top: 0, left: 0, height: '100%' }}>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <Link className="nav-link d-flex align-items-center text-dark" to="/">
                        <FaStickyNote className="me-2" style={{ color: '#007bff' }} />
                        Notes
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link d-flex align-items-center text-dark" to="/task">
                        <FaTasks className="me-2" style={{ color: '#007bff' }} />
                        Tasks
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link d-flex align-items-center text-dark" to="/calendar">
                        <FaCalendarAlt className="me-2" style={{ color: '#007bff' }} />
                        Calendar
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link d-flex align-items-center text-dark" to="/logout">
                        <FaSignOutAlt className="me-2" style={{ color: '#dc3545' }} />
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
