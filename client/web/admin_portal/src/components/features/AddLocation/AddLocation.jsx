import React, { useState } from 'react';
import Button from "../../common/Button/Button";
import Modal from "../../common/Modal/Modal"; // Import the reusable Modal component
import './AddLocation.css';
import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";

function AddLocation() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        locationName: '',
        address: '',
        latitude: '',
        longitude: '',
        type: '',
    });
    const [error, setError] = useState('');

    const locationTypes = [
        { value: '', label: 'Select a Type' },
        { value: 'GAIL_OFFICE', label: 'GAIL Office' },
    ];

    const regionOptions = [
        { value: '', label: 'All Regions' },
        { value: 'EAST', label: 'East' },
        { value: 'NORTH', label: 'North' },
        { value: 'SOUTH', label: 'South' },
        { value: 'WEST', label: 'West' },
        { value: 'NORTHEAST', label: 'North East' },
        { value: 'SOUTHEAST', label: 'South East' },
        { value: 'NORTHWEST', label: 'North West' },
        { value: 'SOUTHWEST', label: 'South West' },
    ];

    const handleAddClick = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setError('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="add-location">
            <div className="add-location-button">
                <Button variant="success" onClick={handleAddClick}>
                    <i className="bi bi-plus"></i>
                    Add New Location
                </Button>
            </div>


            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Add New Location"
            >
                <form className="add-location-form">
                        <Input
                            label="Location Name"
                            type="text"
                            name="locationName"
                            onChange={handleModalClose}
                            placeholder="Enter Official Location Name"
                            value=""
                            required/>

                    <Input
                        label="Location Address"
                        type="textarea"
                        name="address"
                        onChange={handleModalClose}
                        placeholder="Enter Location Address"
                        value=""
                        required/>

                    <Input
                        label="Latitude"
                        type="text"
                        name="latitude"
                        onChange={handleModalClose}
                        placeholder="Enter Latitude"
                        value=""
                        required/>

                    <Input
                        label="Longitude"
                        type="text"
                        name="longitude"
                        onChange={handleModalClose}
                        placeholder="Enter Longitude"
                        value=""
                        required/>

                    <Input
                        label="Geofence Radius (m)"
                        type="number"
                        name="radius"
                        onChange={handleModalClose}
                        placeholder="Enter Geofence Radius"
                        value=""
                        required/>

                    <div className="select-fields">
                        <Select
                            label="Location Type"
                            options={locationTypes}
                            value={formData.type}
                            onChange={(e) => handleInputChange({target: {name: 'locationType', value: e.target.value}})}
                            error={error}
                            disabled={false}
                        />
                        <Select
                            label="Region"
                            options={regionOptions}
                            value={formData.region}
                            onChange={(e) => handleInputChange({target: {name: 'division', value: e.target.value}})}
                            error={error}
                            disabled={false}
                        />
                    </div>

                </form>
            </Modal>
        </div>
    );
}

export default AddLocation;
