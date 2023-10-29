import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import url from '../url';

export const fetchAddressThunk = createAsyncThunk('employee/fetchAddressThunk', async (userId, employeeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}users/${userId}/employees/${employeeId}/addresses`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const address = response.data ?? [];
    return address;
  } catch (error) {
    toast.error(error);
    throw new Error('Failed to fetch address data');
  }
});

export const fetchJobinfoThunk = createAsyncThunk('jobinfo/fetchJobinfoThunk', async (userId, employeeId, jobinfoId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}users/${userId}/employees/${employeeId}/job_infos/${jobinfoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'applocation/json',
      },
    });
    const jobinfo = response.data ?? [];
    return jobinfo;
  } catch (error) {
    toast.error(error);
    throw new Error('Failed to fetch Job Info');
  }
});

const employeeDetailsSlice = createSlice({
  name: 'employeeDetails',
  initialState: {
    addressData: null,
    jobinfoData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddressThunk.fulfilled, (state, action) => ({
      ...state,
      addressData: action.payload,
    }));
    builder.addCase(fetchJobinfoThunk.fulfilled, (state, action) => ({
      ...state,
      jobinfoData: action.payload,
    }));
  },
});

export default employeeDetailsSlice.reducer;
