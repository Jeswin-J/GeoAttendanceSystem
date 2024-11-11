import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal";
import './AddLocation.css';
import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import { addLocation } from '../../../app/locationSlice';
import { validateForm } from '../../../utils/validation';
import { useNavigate } from "react-router-dom";

function AddLocation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.locations);
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        locationName: '',
        address: '',
        latitude: '',
        longitude: '',
        radius: '',
        locationType: '',
        division: '',
    });
    const [formErrors, setFormErrors] = useState({});

    const locationTypes = [
        { value: '', label: 'Select a Type' },
        { value: 'GAIL_OFFICE', label: 'GAIL Office' },
    ];

    const divisionOptions = [
        { value: '', label: 'All Divisions' },
        { value: 'EAST', label: 'East' },
        { value: 'NORTH', label: 'North' },
        { value: 'SOUTH', label: 'South' },
        { value: 'WEST', label: 'West' },
        { value: 'NORTHEAST', label: 'North East' },
        { value: 'SOUTHEAST', label: 'South East' },
        { value: 'NORTHWEST', label: 'North West' },
        { value: 'SOUTHWEST', label: 'South West' },
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

        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const result = await dispatch(addLocation(formData)).unwrap();
            if (result) {
                setModalOpen(false);
                setFormData({
                    locationName: '',
                    address: '',
                    latitude: '',
                    longitude: '',
                    radius: '',
                    locationType: '',
                    division: '',
                });
                navigate('/portal/locations');
            }
        } catch (error) {
            console.error("Failed to add location:", error);
        }
    };

    return (
        <div className="add-location">
            <div className="add-location-button">
                <Button variant="success" onClick={handleAddClick}>
                    <i className="bi bi-building-add"></i>
                    Add New Location
                </Button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Add New Location"
                onContinue={handleFormSubmit}
            >
                <form className="add-location-form">
                    <Input
                        label="Location Name"
                        type="text"
                        name="locationName"
                        onChange={handleInputChange}
                        placeholder="Enter Official Location Name"
                        value={formData.locationName}
                        required
                        error={formErrors.locationName}
                    />

                    <Input
                        label="Location Address"
                        type="textarea"
                        name="address"
                        onChange={handleInputChange}
                        placeholder="Enter Location Address"
                        value={formData.address}
                        required
                        error={formErrors.address}
                    />

                    <Input
                        label="Latitude"
                        type="text"
                        name="latitude"
                        onChange={handleInputChange}
                        placeholder="Enter Latitude"
                        value={formData.latitude}
                        required
                        error={formErrors.latitude}
                    />

                    <Input
                        label="Longitude"
                        type="text"
                        name="longitude"
                        onChange={handleInputChange}
                        placeholder="Enter Longitude"
                        value={formData.longitude}
                        required
                        error={formErrors.longitude}
                    />

                    <Input
                        label="Geofence Radius (m)"
                        type="number"
                        name="radius"
                        onChange={handleInputChange}
                        placeholder="Enter Geofence Radius"
                        value={formData.radius}
                        required
                        error={formErrors.radius}
                    />

                    <div className="select-fields">
                        <Select
                            label="Location Type"
                            options={locationTypes}
                            value={formData.locationType}
                            onChange={(e) => handleInputChange({ target: { name: 'locationType', value: e.target.value } })}
                            error={formErrors.locationType}
                        />
                        <Select
                            label="Division"
                            options={divisionOptions}
                            value={formData.division}
                            onChange={(e) => handleInputChange({ target: { name: 'division', value: e.target.value } })}
                            error={formErrors.division}
                        />
                    </div>

                    {loading && <p className="loading-message">Saving...</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </Modal>
        </div>
    );
}

export default AddLocation;
