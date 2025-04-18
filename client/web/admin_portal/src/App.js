// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from './app/loaderSlice'; 
import Login from './routes/auth/Login';
import Dashboard from './routes/portal/Dashboard';
import Loader from './components/common/Loader/Loader';
import Locations from './routes/portal/Locations';
import LocationDetail from './routes/portal/LocationDetail';
import Employee from "./routes/portal/Employee";
import Attendance from "./routes/portal/Attendance";
import Settings from "./routes/portal/Settings";
import BadRequest from "./routes/error/BadRequest";
import Forbidden from "./routes/error/Forbidden";
import NotFound from "./routes/error/NotFound";
import ServerError from "./routes/error/ServerError";
import EmployeeProfile from "./routes/portal/EmployeeProfile";

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
            <Route path="/portal/emp" element={<Employee />} />
            <Route path="/portal/emp/:employeeId" element={<EmployeeProfile />} />
            <Route path="/portal/attendance" element={<Attendance />} />
            <Route path="/portal/locations" element={<Locations />} />
            <Route path="/location/:locationId" element={<LocationDetail />} />
            <Route path="/portal/settings" element={<Settings />} />


            <Route path="/error/400" element={<BadRequest />} />
            <Route path="/error/403" element={<Forbidden />} />
            <Route path="/error/404" element={<NotFound />} />
            <Route path="/error/500" element={<ServerError />} />
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
