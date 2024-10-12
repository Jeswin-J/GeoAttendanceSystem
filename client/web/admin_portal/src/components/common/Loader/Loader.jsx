import React from 'react';
import { useSelector } from 'react-redux';
import "./Loader.css"

const Loader = () => {
    const isLoading = useSelector((state) => state.loader.isLoading);

    if (!isLoading) return null; // Render nothing if not loading

    return (
        <div className={`loader-overlay ${isLoading ? 'active' : ''}`}>
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
