import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import url from '../url';

// Define the async thunk to fetch departments from the API
export const fetchDepartmentsThunk = createAsyncThunk('departments/fetchDepartmentsThunk', async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}departments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const departments = response.data ?? [];
    return departments;
  } catch (error) {
    toast.error(error);
    throw new Error('Error while fetching departments');
  }
});

// Define the department slice
const departmentsSlice = createSlice({
  name: 'departments',
  initialState: { departments: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDepartmentsThunk.fulfilled, (state, action) => {
      state.status = 'success';
      state.departments = action.payload;
    });
  },
});

// Export the actions and reducer
export default departmentsSlice.reducer;
