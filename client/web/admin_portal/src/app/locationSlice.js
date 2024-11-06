import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async (_, { rejectWithValue }) => {
    const cacheKey = 'locations';
    const cacheTimeKey = 'locations_cache_time';
    const cacheDuration = 30 * 1000; 

    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(cacheTimeKey);

    if (cachedData && cacheTime) {
        const now = new Date().getTime();
        if (now - cacheTime < cacheDuration) {
            return JSON.parse(cachedData);
        } else {
            localStorage.removeItem(cacheKey);
            localStorage.removeItem(cacheTimeKey);
        }
    }

    try {
        const response = await fetch('http://localhost:8082/api/locations/');
        const data = await response.json();

        if (data.success) {
            localStorage.setItem(cacheKey, JSON.stringify(data.data));
            localStorage.setItem(cacheTimeKey, new Date().getTime());
            return data.data;
        } else {
            return rejectWithValue('Failed to fetch locations');
        }
    } catch (error) {
        console.error('Failed to fetch locations:', error);
        return rejectWithValue(error.message);
    }
});

export const fetchLocationById = createAsyncThunk(
    'locations/fetchLocationById',
    async (locationId, { rejectWithValue }) => {
        const cacheKey = `location_${locationId}`;
        const cacheTimeKey = `location_${locationId}_cache_time`;
        const cacheDuration = 30 * 1000;

        const cachedData = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(cacheTimeKey);

        if (cachedData && cacheTime) {
            const now = new Date().getTime();
            if (now - cacheTime < cacheDuration) {
                return JSON.parse(cachedData);
            } else {
                localStorage.removeItem(cacheKey);
                localStorage.removeItem(cacheTimeKey);
            }
        }

        try {
            const response = await fetch(`http://localhost:8082/api/locations/${locationId}`);
            const data = await response.json();

            if (data.success) {
                localStorage.setItem(cacheKey, JSON.stringify(data.data));
                localStorage.setItem(cacheTimeKey, new Date().getTime());
                return data.data;
            } else {
                return rejectWithValue('Failed to fetch location details');
            }
        } catch (error) {
            console.error('Error fetching location details:', error);
            return rejectWithValue(error.message);
        }
    }
);

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
            });
    },
});

export default locationSlice.reducer;
