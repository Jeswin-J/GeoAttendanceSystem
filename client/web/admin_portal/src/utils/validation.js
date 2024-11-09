export const validateForm = (formData) => {
    const errors = {};

    if (!formData.locationName || !formData.locationName.trim()) {
        errors.locationName = 'Location name is required.';
    } else if (formData.locationName.length < 3 || formData.locationName.length > 100) {
        errors.locationName = 'Location name must be between 3 and 100 characters.';
    }


    if (!formData.address || !formData.address.trim()) {
        errors.address = 'Address is required.';
    } else if (formData.address.length < 5 || formData.address.length > 200) {
        errors.address = 'Address must be between 5 and 200 characters.';
    }

    if (!formData.latitude) {
        errors.latitude = 'Latitude is required.';
    } else if (isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90) {
        errors.latitude = 'Latitude must be a valid number between -90 and 90.';
    }

    if (!formData.longitude) {
        errors.longitude = 'Longitude is required.';
    } else if (isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180) {
        errors.longitude = 'Longitude must be a valid number between -180 and 180.';
    }

    if (!formData.radius) {
        errors.radius = 'Geofence radius is required.';
    } else if (isNaN(formData.radius) || formData.radius <= 0 || formData.radius > 10000) {
        errors.radius = 'Radius must be a positive number not exceeding 10,000 meters.';
    }

    if (!formData.locationType) {
        errors.locationType = 'Location type is required.';
    }

    if (!formData.division) {
        errors.division = 'Region is required.';
    }

    return errors;
};


export const validateEmployeeForm = (data) => {
    const errors = {};

    if (!data.employeeId || !data.employeeId.trim()) {
        errors.employeeId = 'Employee ID is required.';
    } else if (!/^[A-Za-z0-9_-]{3,20}$/.test(data.employeeId)) {
        errors.employeeId = 'Employee ID must be alphanumeric and between 3 to 20 characters.';
    }

    if (!data.firstName || !data.firstName.trim()) {
        errors.firstName = 'First name is required.';
    } else if (data.firstName.length < 2 || data.firstName.length > 50) {
        errors.firstName = 'First name must be between 2 and 50 characters.';
    }

    if (!data.lastName || !data.lastName.trim()) {
        errors.lastName = 'Last name is required.';
    } else if (data.lastName.length < 2 || data.lastName.length > 50) {
        errors.lastName = 'Last name must be between 2 and 50 characters.';
    }

    if (!data.workEmail) {
        errors.workEmail = "Work email is required.";
    } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.workEmail)) {
        errors.workEmail = "Must be a valid email address.";
    }

    // Phone Number Validation
    if (!data.phoneNumber) {
        errors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(data.phoneNumber)) {
        errors.phoneNumber = 'Phone number must be a valid 10-digit number.';
    }

    if (!data.department) {
        errors.department = 'Department is required.';
    } else if (data.department.length < 2 || data.department.length > 100) {
        errors.department = 'Department must be between 2 and 100 characters.';
    }

    if (!data.designation) {
        errors.designation = 'Designation is required.';
    } else if (data.designation.length < 2 || data.designation.length > 100) {
        errors.designation = 'Designation must be between 2 and 100 characters.';
    }

    if (!data.employeeType) {
        errors.employeeType = 'Employee type is required.';
    }

    if (!data.dateOfJoining) {
        errors.dateOfJoining = 'Date of joining is required.';
    } else {
        const joiningDate = new Date(data.dateOfJoining);
        const currentDate = new Date();
        if (joiningDate > currentDate) {
            errors.dateOfJoining = 'Date of joining cannot be in the future.';
        }
    }

    return errors;
};
