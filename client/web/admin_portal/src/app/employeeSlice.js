import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083/api';

// const getAuthToken = () => {
//     return localStorage.getItem('authToken');
// };


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = getAuthToken();
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );


export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/emp');
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const addEmployee = createAsyncThunk('employee/addEmployee', async (employeeData, { rejectWithValue }) => {
    try {
        console.log(employeeData);
        const response = await axiosInstance.post('/emp/new', employeeData);
        console.log(response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const fetchEmployeeById = createAsyncThunk(
    'employee/fetchEmployeeById',
    async (employeeId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/emp/${employeeId}`);
            if (!response.data) {
                throw new Error('Employee data is not available');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Slice with reducers and extraReducers
const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        data: [],
        employee: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch employees actions
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

            // Add employee actions
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

            // Fetch employee by ID actions
            .addCase(fetchEmployeeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeById.fulfilled, (state, action) => {
                state.loading = false;
                state.employee = action.payload;
            })
            .addCase(fetchEmployeeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch employee data';
            });
    },
});

export default employeeSlice.reducer;
