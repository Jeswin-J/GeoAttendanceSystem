export const validateForm = (formData) => {
    const errors = {};

    if (!formData.locationName.trim()) errors.locationName = 'Location name is required.';
    if (!formData.address.trim()) errors.address = 'Address is required.';

    if (!formData.latitude) {
        errors.latitude = 'Latitude is required.';
    } else if (isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90) {
        errors.latitude = 'Latitude must be a number between -90 and 90.';
    }

    if (!formData.longitude) {
        errors.longitude = 'Longitude is required.';
    } else if (isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180) {
        errors.longitude = 'Longitude must be a number between -180 and 180.';
    }

    if (!formData.radius) {
        errors.radius = 'Geofence radius is required.';
    } else if (isNaN(formData.radius) || formData.radius <= 0) {
        errors.radius = 'Radius must be a positive number.';
    }

    if (!formData.locationType) errors.locationType = 'Location type is required.';
    if (!formData.division) errors.division = 'Region is required.';

    return errors;
};
