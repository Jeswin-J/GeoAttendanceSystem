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

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employeeData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8083/api/emp', employeeData); // Ensure this is the correct endpoint
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const fetchEmployeeById = createAsyncThunk(
    'employee/fetchEmployeeById',
    async (employeeId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8083/api/emp/${employeeId}`);
            return response.data; // Ensure your API is returning the employee object
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

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
            })
            .addCase(addEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to add employee';
            })
            .addCase(fetchEmployeeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeById.fulfilled, (state, action) => {
                state.loading = false;
                state.employee = action.payload.data;
            })
            .addCase(fetchEmployeeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch employee data';
            });
    }
});

export default employeeSlice.reducer;
