import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import url from '../url';

export const fetchContractThunk = createAsyncThunk('contract/fetchContractThunk', async (employeeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}users/employees/${employeeId}/contracts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const contract = response.data;
    return { employeeId, contract };
  } catch (error) {
    toast.error(error);
    throw new Error('Failed to fetch contract data');
  }
});

const contractSlice = createSlice({
  name: 'contract',
  initialState: { contract: [], status: 'idle' },
  reducers: {},
  extraReducers: {
    [fetchContractThunk.fulfilled]: (state, action) => {
      state.status = 'success';
      state.contract = action.payload;
    },
  },
});

export default contractSlice.reducer;
