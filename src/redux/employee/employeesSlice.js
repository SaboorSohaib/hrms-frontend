import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import url from '../url';

export const fetchEmployeesThunk = createAsyncThunk('employee/fetchEmployeesThunk', async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}users/${userId}/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const employees = response.data ?? [];
    return { userId, employees };
  } catch (error) {
    toast.error(error);
    throw new Error('Error while fetching Employees');
  }
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState: { employees: [], employeesByUser: {}, status: 'idle' },
  extraReducers(builder) {
    builder.addCase(fetchEmployeesThunk.fulfilled, (state, action) => {
      const { userId, employees } = action.payload;
      state.employeesByUser[userId] = employees;
      state.status = 'succeeded';
    });
  },
});

export default employeesSlice.reducer;
