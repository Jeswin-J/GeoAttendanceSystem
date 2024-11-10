import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../app/employeeSlice';
import Table from '../../components/common/Table/Table';
import Portal from "../../components/layout/Portal/Portal";
import { useNavigate } from "react-router-dom";
import AddEmployee from "../../components/features/AddEmployee/AddEmployee";
import IconCard from "../../components/common/IconCard/IconCard";
import InfoCardGroup from "../../components/features/InfoCardGroup/InfoCardGroup";

function Employee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    if (loading) return <p>Loading employee data...</p>;
    if (error) return <p>Error: {error}</p>;

    const cardData = [
        { title: 'Total Employees', value: `10000`, icon: <i className="bi bi-people"></i> },
        { title: 'Full-Time Employees', value: '987', icon: <i className="bi bi-watch"></i> },
        { title: 'Gender Ratio', value: "2 : 1", icon: <i className="bi bi-percent"></i> },
        { title: 'New Hires', value: "1000", icon: <i className="bi bi-stars"></i> },
        { title: 'Average Tenure', value: '5 Years', icon: <i className="bi bi-person-workspace"></i> },
    ];

    return (
        <Portal>
            <InfoCardGroup cardData={cardData}/>
            <Table
                tableHeading="Employee Directory"
                columns={columns}
                data={employees}
                onRowClick={(row) => navigate(`/portal/emp/${row.employeeId}`)}
            />
            <AddEmployee />
        </Portal>
    );
}

export default Employee;
