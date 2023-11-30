import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authenticationReducer } from './user/authentication';
import usersSlice from './user/usersSlice';
import employeesSlice from './employee/employeesSlice';
import employeeDetailsSlice from './employee/EmployeeDetails';
import addressSlice from './employee/addressSlice';
import jobinfoSlice from './employee/jobinfoSlice';
import SalarySlice from './employee/salarySlice';
import contractSlice from './employee/contractSlice';
import attendanceSlice from './employee/attendanceSlice';
import departmentSlice from './department/departmentsSlice';
import projectsSlice from './project/projectSlice';
import reportsSlice from './report/reportsSlice';

const token = localStorage.getItem('token');
const initialState = {
  auth: {
    token: token || null,
    isAuthenticated: !!token,
  },
};

const rootReducer = combineReducers({
  auth: authenticationReducer,
  users: usersSlice,
  employees: employeesSlice,
  address: addressSlice,
  jobinfo: jobinfoSlice,
  contract: contractSlice,
  salary: SalarySlice,
  attendance: attendanceSlice,
  employeeDetails: employeeDetailsSlice,
  departments: departmentSlice,
  projects: projectsSlice,
  reports: reportsSlice,
});

export default configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
