import { toast } from 'react-toastify';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
} from '../types';
import { getToken, createAccount } from './user';

const initialState = {
  token: null,
  isAuthenticated: false,
  error: null,
  success: null,
};

export const login = (reqBody) => async (dispatch) => {
  try {
    const data = await getToken(reqBody);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user_id', data.id);
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_name');
  dispatch({ type: LOGOUT });
  toast.success('Logged out successfully');
};

export const signup = (reqBody) => async (dispatch) => {
  try {
    const success = await createAccount(reqBody);
    dispatch({ type: SIGNUP_SUCCESS, payload: success });
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, payload: error.message });
  }
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        success: true,
        message: action.payload,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    case LOGOUT:
      return {
        success: true,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};
