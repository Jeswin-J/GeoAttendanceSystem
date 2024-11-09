import React from 'react';
import "./Dp.css"

function Dp({ name, dp, designation }) {
    return (
        <div className="dp-container">
            <img src={dp} alt="Profile Pic" className="dp-img"/>
            <h3>{name}</h3>
            <p>{designation}</p>
        </div>
    );
}

export default Dp;
