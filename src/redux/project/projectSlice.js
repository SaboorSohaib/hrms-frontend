import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import url from '../url';

export const fetchProjectsThunk = createAsyncThunk('project/fetchProjectsThunk', async (departmentId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}departments/${departmentId}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/Json',

      },
    });
    const projects = response.data ?? [];
    return { departmentId, projects };
  } catch (error) {
    toast.error(error);
    throw new Error('Error while fetching Projects');
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { projects: [], projectsByDepartment: {}, status: 'idle' },
  extraReducers(builder) {
    builder.addCase(fetchProjectsThunk.fulfilled, (state, action) => {
      const { departmentId, projects } = action.payload;
      state.projectsByDepartment[departmentId] = projects;
      state.status = 'succeeded';
    });
  },
});

export default projectsSlice.reducer;
