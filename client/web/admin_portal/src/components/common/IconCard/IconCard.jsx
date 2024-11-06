import React from 'react';
import './IconCard.css';

function IconCard({ title, icon, value }) {
    return (
        <div className="card">
            <div className="card-icon">
                {icon}
            </div>
            <div className="card-content">
                <p className="card-title">{title}</p>
                <p className="card-value">{value}</p>
            </div>
        </div>
    )
}

export default IconCard;
