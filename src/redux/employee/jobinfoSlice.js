import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import url from '../url';

export const fetchJobinfoThunk = createAsyncThunk('jobinfo/fetchJobinfoThunk', async (employeeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}users/employees/${employeeId}/job_infos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const jobinfo = response.data;
    return { employeeId, jobinfo };
  } catch (error) {
    toast.error(error);
    throw new Error('Failed to fetch jobinfo data');
  }
});

const jobinfoSlice = createSlice({
  name: 'jobinfo',
  initialState: { jobinfo: [], status: 'idle' },
  reducers: {},
  extraReducers: {
    [fetchJobinfoThunk.fulfilled]: (state, action) => {
      state.status = 'success';
      state.jobinfo = action.payload;
    },
  },
});

export default jobinfoSlice.reducer;
