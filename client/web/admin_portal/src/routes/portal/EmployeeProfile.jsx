import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Portal from '../../components/layout/Portal/Portal';
import { fetchEmployeeById } from "../../app/employeeSlice";
import ProfileLayout from "../../components/layout/ProfileLayout/ProfileLayout";

function EmployeeProfile() {
    const { employeeId } = useParams();
    const dispatch = useDispatch();
    const { employee, loading, error } = useSelector((state) => state.employees);

    useEffect(() => {
        if (employeeId) {
            dispatch(fetchEmployeeById(employeeId));
        }
    }, [dispatch, employeeId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!employee) return <p>Employee not found</p>;

    return (
        <>
            <Portal>
                <h2>Employee Details</h2>
                <ProfileLayout props={employee}/>
            </Portal>
        </>
    );
}

export default EmployeeProfile;
