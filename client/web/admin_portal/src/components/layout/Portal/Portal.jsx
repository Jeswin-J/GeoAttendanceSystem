import React from 'react';
import './Portal.css'; 
import Header from '../../common/Header/Header';
import Sidebar from '../../common/Sidebar/Sidebar';
import Footer from '../../common/Footer/Footer';

const Portal = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <Sidebar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Portal;
