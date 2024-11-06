import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../../../app/locationSlice';
import Modal from '../../common/Modal/Modal';
import Button from "../../common/Button/Button";
import './MapView.css';
import Map from "../../common/Map/Map";
import Input from "../../common/Input/Input";
import {useNavigate} from "react-router-dom";
import Table from "../../common/Table/Table";

function MapView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useSelector((state) => state.locations.location);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editedLocation, setEditedLocation] = useState(() => JSON.parse(JSON.stringify(location || {})));



    const handleEditButtonClick = () => {
        setEditedLocation(location);
        setModalOpen(true);
    };


    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedLocation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSaveChanges = async () => {
        const resultAction = await dispatch(updateLocation(editedLocation));

        if (updateLocation.fulfilled.match(resultAction)) {
            setModalOpen(false);
            navigate('/portal/locations');
        } else {
            console.error('Failed to update location:', resultAction.error.message);
        }
    };

    if (!location) {
        return <p>Location data is not available.</p>;
    }

    return (
        <div className="map-view">
            <div className="map-info-grid">
                <div className="map-container">
                    <div>
                        <h4 style={{ marginBottom: 0 }}>Address</h4>
                        <p>{location.address}</p>
                        <p>Type: {location.type}</p>
                    </div>

                    <div className="center">
                        <Button
                            className="edit-button"
                            onClick={handleEditButtonClick}
                        >
                            <i className="bi bi-pencil-square"></i>
                            Edit Information
                        </Button>
                    </div>
                </div>

                <div className="map-container">
                    <div className="map">
                        <Map
                            center={[location.latitude, location.longitude]}
                            zoom={13}
                            markers={[{
                                position: [location.latitude, location.longitude],
                                popupContent: location.locationName
                            }]}
                        />
                    </div>
                </div>
            </div>


            <Modal
                onContinue={handleSaveChanges}
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Edit Location"
            >
                <form onSubmit={(e) => e.preventDefault()}>

                    <div className="form-group">
                        <Input
                            label="Official Name"
                            type="text"
                            name="locationName"
                            value={editedLocation?.locationName || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            label="Address"
                            type="text"
                            name="address"
                            value={editedLocation?.address || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            label="Latitude"
                            type="number"
                            name="latitude"
                            value={editedLocation?.latitude || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            label="Longitude"
                            type="number"
                            name="longitude"
                            value={editedLocation?.longitude || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                </form>
            </Modal>
        </div>
    );
}

export default MapView;
