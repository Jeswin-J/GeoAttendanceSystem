import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../app/employeeSlice';
import Table from '../../components/common/Table/Table';
import Portal from "../../components/layout/Portal/Portal";

function Employee() {
    const dispatch = useDispatch();
    const { data: employees, loading, error } = useSelector((state) => state.employees);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const columns = [
        { key: 'employeeId', label: 'Employee ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'workEmail', label: 'Work Email' },
        { key: 'phoneNumber', label: 'Phone Number' },
        { key: 'designation', label: 'Designation' },
        { key: 'department', label: 'Department' },
        { key: 'status', label: 'Status' },
        { key: 'dateOfJoining', label: 'Date of Joining' },
        { key: 'employeeType', label: 'Employee Type' }
    ];

    const filterOptions = [
        { value: '', label: 'All Departments' },
        { value: 'HUMAN_RESOURCE', label: 'Human Resources' },
        { value: 'TECHNICAL', label: 'Technical' },
        { value: 'ADMINISTRATIVE', label: 'Administrative' },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Portal>
            <Table
                tableHeading="Employee Directory"
                columns={columns}
                data={employees}
                filterOptions={filterOptions}
            />
        </Portal>
    );
}

export default Employee;
