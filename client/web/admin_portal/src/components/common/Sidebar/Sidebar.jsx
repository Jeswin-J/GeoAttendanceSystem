import React from 'react';
import './Sidebar.css';

const SidebarItem = ({ href, iconClass, label }) => (
    <li>
        <a href={href} aria-label={label}>
            <i className={`bi ${iconClass}`} aria-hidden="true"></i>
            <br />
            <span>{label}</span>
        </a>
    </li>
);

const Sidebar = () => {
    const menuItems = [
        { href: '/portal/home', iconClass: 'bi-house', label: 'Dashboard' },
        { href: '/portal/attendance', iconClass: 'bi-card-checklist', label: 'Attendance' },
        { href: '/portal/emp', iconClass: 'bi-people', label: 'Employee' },
        { href: '/portal/locations', iconClass: 'bi-geo', label: 'Locations' },
        // { href: '/portal/reports', iconClass: 'bi-graph-up', label: 'Reports' },
        { href: '/portal/settings', iconClass: 'bi-gear', label: 'Settings' }
    ];

    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                {menuItems.map((item, index) => (
                    <SidebarItem
                        key={index}
                        href={item.href}
                        iconClass={item.iconClass}
                        label={item.label}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
