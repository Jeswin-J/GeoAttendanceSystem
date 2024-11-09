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


export const validateEmployeeForm = (data) => {
    const errors = {};

    if (!data.firstName) {
        errors.firstName = 'First name is required';
    }

    if (!data.lastName) {
        errors.lastName = 'Last name is required';
    }

    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (!data.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(data.phoneNumber)) {
        errors.phoneNumber = 'Phone number must be 10 digits';
    }

    if (!data.department) {
        errors.department = 'Department is required';
    }

    if (!data.designation) {
        errors.designation = 'Designation is required';
    }

    if (!data.employeeType) {
        errors.employeeType = 'Employee type is required';
    }

    if (!data.dateOfJoining) {
        errors.dateOfJoining = 'Date of joining is required';
    }

    return errors;
};

