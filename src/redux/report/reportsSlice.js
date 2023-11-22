import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import url from '../url';

export const fetchReportsThunk = createAsyncThunk('report/fetchReportsThunk', async (departmentId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}departments/${departmentId}/reports`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const reports = response.data ?? [];
    return { departmentId, reports };
  } catch (error) {
    toast.error(error);
    throw new Error('Error while fetching Reports');
  }
});

const reportsSlice = createSlice({
  name: 'reports',
  initialState: { reports: [], reportsByDepartment: {}, status: 'idle' },
  extraReducers(builder) {
    builder.addCase(fetchReportsThunk.fulfilled, (state, action) => {
      const { departmentId, reports } = action.payload;
      state.reportsByDepartment[departmentId] = reports;
      state.status = 'succeeded';
    });
  },
});

export default reportsSlice.reducer;
