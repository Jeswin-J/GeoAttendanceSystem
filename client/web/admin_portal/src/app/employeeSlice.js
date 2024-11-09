import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:8083/api/emp');
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch employees';
            });
    }
});

export default employeeSlice.reducer;
