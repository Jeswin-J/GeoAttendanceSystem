import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";
import './AddEmployee.css';
import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import { addEmployee } from '../../../app/employeeSlice';
import { validateEmployeeForm } from '../../../utils/validation';
import { useNavigate } from "react-router-dom";

function AddEmployee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.employees);
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        department: '',
        designation: '',
        dateOfJoining: '',
        employeeType: '',
    });
    const [formErrors, setFormErrors] = useState({});

    const departmentOptions = [
        { value: '', label: 'Select Department' },
        { value: 'HUMAN_RESOURCE', label: 'Human Resources' },
        { value: 'TECHNICAL', label: 'Technical' },
        { value: 'ADMINISTRATIVE', label: 'Administrative' },
    ];

    const designationOptions = [
        { value: '', label: 'Select Designation' },
        { value: 'MANAGER', label: 'Manager' },
        { value: 'DEVELOPER', label: 'Developer' },
        { value: 'HR', label: 'HR' },
    ];

    const employeeTypeOptions = [
        { value: '', label: 'Select Employee Type' },
        { value: 'FULL_TIME', label: 'Full Time' },
        { value: 'PART_TIME', label: 'Part Time' },
    ];

    const handleAddClick = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const errors = validateEmployeeForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const result = await dispatch(addEmployee(formData)).unwrap();
            if (result) {
                setModalOpen(false);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    department: '',
                    designation: '',
                    dateOfJoining: '',
                    employeeType: '',
                });
                navigate('/portal/employees');
            }
        } catch (error) {
            console.error("Failed to add employee:", error);
        }
    };

    return (
        <div className="add-employee">
            <div className="add-employee-button">
                <Button variant="success" onClick={handleAddClick}>
                    <i className="bi bi-plus"></i>
                    Add New Employee
                </Button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Add New Employee"
                onContinue={handleFormSubmit}
            >
                <form className="add-employee-form">
                    <Input
                        label="First Name"
                        type="text"
                        name="firstName"
                        onChange={handleInputChange}
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        required
                        error={formErrors.firstName}
                    />

                    <Input
                        label="Last Name"
                        type="text"
                        name="lastName"
                        onChange={handleInputChange}
                        placeholder="Enter Last Name"
                        value={formData.lastName}
                        required
                        error={formErrors.lastName}
                    />

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        value={formData.email}
                        required
                        error={formErrors.email}
                    />

                    <Input
                        label="Phone Number"
                        type="text"
                        name="phoneNumber"
                        onChange={handleInputChange}
                        placeholder="Enter Phone Number"
                        value={formData.phoneNumber}
                        required
                        error={formErrors.phoneNumber}
                    />


                    <div className="input-select-fields">
                        <Input
                        label="Date of Joining"
                        type="date"
                        name="dateOfJoining"
                        onChange={handleInputChange}
                        value={formData.dateOfJoining}
                        required
                        error={formErrors.dateOfJoining}
                        />

                        <Select
                            label="Department"
                            options={departmentOptions}
                            value={formData.department}
                            onChange={(e) => handleInputChange({target: {name: 'department', value: e.target.value}})}
                            error={formErrors.department}
                        />
                    </div>

                        <div className="select-fields">

                            <Select
                                label="Designation"
                                options={designationOptions}
                                value={formData.designation}
                                onChange={(e) => handleInputChange({
                                    target: {
                                        name: 'designation',
                                        value: e.target.value
                                    }
                                })}
                                error={formErrors.designation}
                            />

                            <Select
                                label="Employee Type"
                                options={employeeTypeOptions}
                                value={formData.employeeType}
                                onChange={(e) => handleInputChange({
                                    target: {
                                        name: 'employeeType',
                                        value: e.target.value
                                    }
                                })}
                                error={formErrors.employeeType}
                            />

                        </div>

                        {loading && <p className="loading-message">Saving...</p>}
                        {error && <p className="error-message">{error}</p>}
                </form>
            </Modal>
        </div>
);
}

export default AddEmployee;
