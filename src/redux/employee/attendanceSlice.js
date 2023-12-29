import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import url from '../url';

export const fetchAttendanceThunk = createAsyncThunk('attendance/fetchAttendanceThunk', async (employeeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}users/employees/${employeeId}/attendances`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const attendance = response.data;
    return { attendance, employeeId };
  } catch (error) {
    toast.error(error);
    throw new Error('Failed to fetch attendance data');
  }
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: { attendance: [], status: 'idle' },
  reducers: {},
  extraReducers: {
    [fetchAttendanceThunk.fulfilled]: (state, action) => {
      state.status = 'success';
      state.attendance = action.payload;
    },
  },
});

export default attendanceSlice.reducer;
