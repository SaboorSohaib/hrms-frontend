import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import url from '../url';

export const fetchAddressThunk = createAsyncThunk('address/fetchAddressThunk', async (employeeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}users/employees/${employeeId}/addresses`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const address = response.data;
    return { employeeId, address };
  } catch (error) {
    toast.error(error);
    throw new Error('Failed to fetch address data');
  }
});

const addressSlice = createSlice({
  name: 'address',
  initialState: { address: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddressThunk.fulfilled, (state, action) => {
      state.status = 'success';
      state.address = action.payload;
    });
  },
});
export default addressSlice.reducer;
