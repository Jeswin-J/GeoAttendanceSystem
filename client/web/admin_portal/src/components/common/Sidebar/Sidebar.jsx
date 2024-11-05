import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                <li>
                    <a href="/portal/home">
                        <i className="bi bi-house"></i>
                        <br />
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="/portal/attendance">
                        <i className="bi bi-card-checklist"></i>
                        <br />
                        <span>Attendance</span>
                    </a>
                </li>
                <li>
                    <a href="/portal/locations">
                        <i className="bi bi-geo"></i>
                        <br />
                        <span>Locations</span>
                    </a>
                </li>
                <li>
                    <a href="/portal/reports">
                        <i className="bi bi-graph-up"></i>
                        <br />
                        <span>Reports</span>
                    </a>
                </li>
                <li>
                    <a href="/portal/settings">
                        <i className="bi bi-gear"></i>
                        <br />
                        <span>Settings</span>
                    </a>
                </li>
            </ul>
            <ul className="sidebar-list">
                <li>
                    <a href="/logout">
                        <i class="bi bi-box-arrow-left"></i>
                        <br />
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
