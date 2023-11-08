import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import url from '../url';

export const fetchSalaryThunk = createAsyncThunk('salary/fetchSalaryThunk', async (employeeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}users/employees/${employeeId}/salaries`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const salary = response.data;
    return { employeeId, salary };
  } catch (error) {
    toast.error(error);
    throw new Error('Failed to fetch salary data');
  }
});

const salarySlice = createSlice({
  name: 'salary',
  initialState: { salary: [], status: 'idle' },
  reducers: {},
  extraReducers: {
    [fetchSalaryThunk.fulfilled]: (state, action) => {
      state.status = 'success';
      state.salary = action.payload;
    },
  },
});

export default salarySlice.reducer;
