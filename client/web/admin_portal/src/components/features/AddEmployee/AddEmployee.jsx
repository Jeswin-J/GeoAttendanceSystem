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
import { departmentOptions, designationOptions, employeeTypeOptions } from "../../../data/employee/data";

function AddEmployee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.employees);

    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        workEmail: '',
        phoneNumber: '',
        department: '',
        designation: '',
        dateOfJoining: '',
        employeeType: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        setIsSubmitting(true);

        try {
            const result = await dispatch(addEmployee(formData)).unwrap();
            if (result) {
                setModalOpen(false);
                resetForm();
                navigate('/portal/emp');
            }
        } catch (error) {
            console.error("Failed to add employee:", error);
            setFormErrors({ general: 'Failed to add employee. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form data
    const resetForm = () => {
        setFormData({
            employeeId: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            department: '',
            designation: '',
            dateOfJoining: '',
            employeeType: '',
        });
        setFormErrors({});
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
                    {formErrors.general && <p className="error-message">{formErrors.general}</p>}

                    <Input
                        label="Employee ID"
                        type="text"
                        name="employeeId"
                        onChange={handleInputChange}
                        placeholder="Enter Employee ID"
                        value={formData.employeeId}
                        required
                        error={formErrors.employeeId}
                    />

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
                        name="workEmail"
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        value={formData.workEmail}
                        required
                        error={formErrors.workEmail}
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
                            onChange={handleInputChange}
                            name="department"
                            error={formErrors.department}
                        />
                    </div>

                    <div className="select-fields">
                        <Select
                            label="Designation"
                            options={designationOptions}
                            value={formData.designation}
                            onChange={handleInputChange}
                            name="designation"
                            error={formErrors.designation}
                        />

                        <Select
                            label="Employee Type"
                            options={employeeTypeOptions}
                            value={formData.employeeType}
                            onChange={handleInputChange}
                            name="employeeType"
                            error={formErrors.employeeType}
                        />
                    </div>

                    {loading && <p className="loading-message">Saving...</p>}
                    {isSubmitting && <p className="loading-message">Submitting...</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </Modal>
        </div>
    );
}

export default AddEmployee;
