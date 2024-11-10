import React from 'react';
import './AttendanceStatus.css';

function AttendanceStatus({ status }) {
    // Determine the display text and CSS class based on status
    const getStatusInfo = () => {
        switch (status) {
            case 'present':
                return { text: 'Present', className: 'status-present' };
            case 'absent':
                return { text: 'Absent', className: 'status-absent' };
            case 'break':
                return { text: 'On Break', className: 'status-break' };
            default:
                return { text: 'Status Unknown', className: 'status-unknown' };
        }
    };

    const { text, className } = getStatusInfo();

    return (
        <div className={`attendance-status-card ${className}`}>
            <p>{text}</p>
        </div>
    );
}

export default AttendanceStatus;
