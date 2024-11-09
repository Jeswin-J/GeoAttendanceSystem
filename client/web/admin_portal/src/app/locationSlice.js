import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const cacheDuration = 30 * 1000;

const getCachedData = (cacheKey, cacheTimeKey) => {
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(cacheTimeKey);
    const now = new Date().getTime();

    if (cachedData && cacheTime && now - cacheTime < cacheDuration) {
        return JSON.parse(cachedData);
    }

    localStorage.removeItem(cacheKey);
    localStorage.removeItem(cacheTimeKey);
    return null;
};

const setCache = (cacheKey, cacheTimeKey, data) => {
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheTimeKey, new Date().getTime());
};


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8082/api/',
    timeout: 5000,
});

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async (_, { rejectWithValue }) => {
    const cacheKey = 'locations';
    const cacheTimeKey = 'locations_cache_time';

    const cachedData = getCachedData(cacheKey, cacheTimeKey);
    if (cachedData) return cachedData;

    try {
        const response = await axiosInstance.get('locations/');
        if (response.data.success) {
            setCache(cacheKey, cacheTimeKey, response.data.data);
            return response.data.data;
        } else {
            return rejectWithValue('Failed to fetch locations');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Network error occurred');
    }
});

export const fetchLocationById = createAsyncThunk('locations/fetchLocationById', async (locationId, { rejectWithValue }) => {
    const cacheKey = `location_${locationId}`;
    const cacheTimeKey = `location_${locationId}_cache_time`;

    const cachedData = getCachedData(cacheKey, cacheTimeKey);
    if (cachedData) return cachedData;

    try {
        const response = await axiosInstance.get(`locations/${locationId}`);
        if (response.data.success) {
            setCache(cacheKey, cacheTimeKey, response.data.data);
            return response.data.data;
        } else {
            return rejectWithValue('Failed to fetch location details');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Network error occurred');
    }
});

export const updateLocation = createAsyncThunk('locations/updateLocation', async (locationData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`locations/update/${locationData.locationId}`, locationData);
        if (response.data.success) {
            alert("Location updated successfully");
            return response.data.data;
        } else {
            return rejectWithValue('Failed to update location');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Network error occurred');
    }
});

export const addLocation = createAsyncThunk('locations/addLocation', async (locationData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('locations/new', locationData);
        if (response.data.success) {
            return response.data.data;
        } else {
            return rejectWithValue('Failed to add location');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'An error occurred during submission.');
    }
});

export const deleteLocation = createAsyncThunk('locations/deleteLocation', async (locationId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`locations/delete/${locationId}`);
        if (response.data.success) {
            return locationId;
        } else {
            return rejectWithValue('Failed to delete location');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Network error occurred during deletion');
    }
});

const locationSlice = createSlice({
    name: 'locations',
    initialState: {
        locations: [],
        location: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.locations.push(action.payload);
            })
            .addCase(addLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to add location.';
            })
            .addCase(fetchLocations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.loading = false;
                state.locations = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not fetch locations';
            })
            .addCase(fetchLocationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLocationById.fulfilled, (state, action) => {
                state.loading = false;
                state.location = action.payload;
            })
            .addCase(fetchLocationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Could not fetch location details';
            })
            .addCase(updateLocation.fulfilled, (state, action) => {
                state.location = action.payload;
            })
            .addCase(deleteLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.locations = state.locations.filter(
                    (location) => location.locationId !== action.payload
                );
                state.location = null;
            })
            .addCase(deleteLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete location';
            });
    },
});

export default locationSlice.reducer;
