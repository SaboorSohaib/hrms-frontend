import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import url from '../url';

export const fetchUsersThunk = createAsyncThunk('user/fetchUsersThunk', async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}users`, { // Use Axios to send a GET request
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const users = response.data ?? [];
    return users;
  } catch (error) {
    toast.error(error);
    throw new Error('Error while fetching Users');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], status: 'idle' },
  extraReducers(builder) {
    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.status = 'success';
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
