import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Portal from '../../components/layout/Portal/Portal';
import {fetchEmployeeById} from "../../app/employeeSlice";

function EmployeeProfile() {
    const { employeeId } = useParams();
    const dispatch = useDispatch();
    const { employee, loading, error } = useSelector((state) => state.employees);

    useEffect(() => {
        dispatch(fetchEmployeeById(employeeId));
    }, [dispatch, employeeId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Portal>
                <h2>{employee?.dateOfJoining || 'Location Details'}</h2>
            </Portal>
        </>
    );
}

export default EmployeeProfile;
