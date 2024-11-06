import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
};

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async (_, { rejectWithValue }) => {
    const cacheKey = 'locations';
    const cacheTimeKey = 'locations_cache_time';

    const cachedData = getCachedData(cacheKey, cacheTimeKey);
    if (cachedData) return cachedData;

    try {
        const response = await fetchWithTimeout('http://localhost:8082/api/locations/', { method: 'GET' });

        if (!response.ok) {
            throw new Error('Failed to fetch locations: Server responded with an error');
        }

        const data = await response.json();
        if (data.success) {
            setCache(cacheKey, cacheTimeKey, data.data);
            return data.data;
        } else {
            return rejectWithValue('Failed to fetch locations');
        }
    } catch (error) {
        return rejectWithValue(error.message || 'Network error occurred');
    }
});

export const fetchLocationById = createAsyncThunk('locations/fetchLocationById', async (locationId, { rejectWithValue }) => {
    const cacheKey = `location_${locationId}`;
    const cacheTimeKey = `location_${locationId}_cache_time`;

    const cachedData = getCachedData(cacheKey, cacheTimeKey);
    if (cachedData) return cachedData;

    try {
        const response = await fetchWithTimeout(`http://localhost:8082/api/locations/${locationId}`, { method: 'GET' });

        if (!response.ok) {
            throw new Error(`Failed to fetch location ${locationId}: Server responded with an error`);
        }

        const data = await response.json();
        if (data.success) {
            setCache(cacheKey, cacheTimeKey, data.data);
            return data.data;
        } else {
            return rejectWithValue('Failed to fetch location details');
        }
    } catch (error) {
        return rejectWithValue(error.message || 'Network error occurred');
    }
});

export const updateLocation = createAsyncThunk('locations/updateLocation', async (locationData, { rejectWithValue }) => {
    try {
        const response = await fetchWithTimeout(`http://localhost:8082/api/locations/update/${locationData.locationId}`, {
            method: 'PUT',
            body: JSON.stringify(locationData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to update location');
        }

        const data = await response.json();
        if (data.success) {
            alert("Location updated successfully")
            return data.data;
        } else {
            return rejectWithValue('Failed to update location');
        }
    } catch (error) {
        return rejectWithValue(error.message || 'Network error occurred');
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
                state.location = action.payload; // Update the location in state with the new data
            });
    },
});

export default locationSlice.reducer;
