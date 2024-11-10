import React from 'react';
import "./Dp.css"

function Dp({ name, dp, designation }) {
    return (
        <div className="dp-container">
            <img src={dp} alt="Profile Pic" className="dp-img"/>
        </div>
    );
}

export default Dp;
