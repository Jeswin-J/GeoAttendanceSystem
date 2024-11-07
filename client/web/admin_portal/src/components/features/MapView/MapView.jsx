import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLocation, updateLocation } from '../../../app/locationSlice';
import Modal from '../../common/Modal/Modal';
import Button from "../../common/Button/Button";
import './MapView.css';
import Map from "../../common/Map/Map";
import Input from "../../common/Input/Input";
import { useNavigate } from "react-router-dom";

function MapView() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useSelector((state) => state.locations.location);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteConfirmation, setDeleteConfirmation] = useState(false);
    const [editedLocation, setEditedLocation] = useState(() => JSON.parse(JSON.stringify(location || {})));
    const [confirmationInput, setConfirmationInput] = useState("");

    const handleEditButtonClick = () => {
        setEditedLocation(location);
        setModalOpen(true);
        setDeleteConfirmation(false);
    };

    const handleDeleteButtonClick = () => {
        setModalOpen(true);
        setDeleteConfirmation(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setConfirmationInput("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedLocation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfirmationInputChange = (e) => {
        setConfirmationInput(e.target.value);
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

    const handleDeleteLocation = async () => {
        if (confirmationInput === location.locationName) {
            const resultAction = await dispatch(deleteLocation(location.locationId));
            if (deleteLocation.fulfilled.match(resultAction)) {
                setModalOpen(false);
                navigate('/portal/locations');
            } else {
                console.error('Failed to delete location:', resultAction.error.message);
            }
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

                    <div className="center" style={{ gap: 15 }}>
                        <Button
                            variant="danger"
                            className="edit-button"
                            onClick={handleDeleteButtonClick}
                        >
                            <i className="bi bi-trash"></i>
                            Delete Location
                        </Button>

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
                onContinue={isDeleteConfirmation ? handleDeleteLocation : handleSaveChanges}
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={isDeleteConfirmation ? "Confirm Deletion" : "Edit Location"}
                showContinue={!isDeleteConfirmation}
                showCancel={!isDeleteConfirmation}
            >
                {isDeleteConfirmation ? (
                    <div>
                        <p>There is <b>no way to reverse</b> this action. To confirm deletion, type <span className="grey-bg">{location.locationName}</span></p>
                        <div style={{marginRight: 15}}>
                            <Input
                                type="text"
                                value={confirmationInput}
                                onChange={handleConfirmationInputChange}
                                placeholder={location.locationName}
                                name="confirmation"/>
                        </div>

                        <div className="center">
                            <Button
                                onClick={handleDeleteLocation}
                                disabled={confirmationInput !== location.locationName}
                                variant="danger"
                            >
                                Confirm Delete
                            </Button>
                        </div>
                    </div>
                ) : (
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
                )}
            </Modal>
        </div>
    );
}

export default MapView;
