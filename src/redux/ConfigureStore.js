import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authenticationReducer } from './user/authentication';

const token = localStorage.getItem('token');
const initialState = {
  auth: {
    token: token || null,
    isAuthenticated: !!token,
  },
};

const rootReducer = combineReducers({
  auth: authenticationReducer,
});

export default configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
