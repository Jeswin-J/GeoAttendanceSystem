// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from './app/loaderSlice'; 
import Login from './routes/auth/Login';
import Dashboard from './routes/portal/Dashboard';
import Loader from './components/common/Loader/Loader';
import Locations from './routes/portal/Locations';

const AppRoutes = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoader());

        const timer = setTimeout(() => {
            dispatch(hideLoader()); 
        }, 1000); 

        return () => clearTimeout(timer);
    }, [dispatch, location]); 

    return (
        <Routes>
            <Route path="/auth/login" element={<Login />} />

            
            <Route path="/portal/home" element={<Dashboard />} />
            <Route path="/portal/locations" element={<Locations />} />
        </Routes>
    );
};

function App() {
    return (
        <BrowserRouter>
            <Loader />
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
