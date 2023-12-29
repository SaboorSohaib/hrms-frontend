import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Employees from '../pages/employee/Employees';
import MultiStepForm from '../pages/employee/MultiStepForm';
import AddEmployee from '../pages/employee/AddEmployee';
import ShowSingleEmployee from '../pages/employee/ShowOneEmployee';
import AddAddress from '../pages/employee/address/AddAddress';
import AddContract from '../pages/employee/contracts/AddContract';
import AddAttendance from '../pages/employee/attendance/AddAttendance';
import AddJobInfo from '../pages/employee/job/AddJobInfo';
import AddSalary from '../pages/employee/salary/AddSalary';
import Department from '../pages/department/Department';
import AddDepartment from '../pages/department/AddDepartment';
import Project from '../pages/project/Project';
import AddProject from '../pages/project/AddProject';
import Report from '../pages/reports/Report';
import AddReport from '../pages/reports/AddReport';
import Address from '../pages/employee/address/Address';
import Jobinfo from '../pages/employee/job/Jobinfo';
import Contract from '../pages/employee/contracts/Contract';
import Salary from '../pages/employee/salary/Salary';

const isAuthenticated = false;
const AuthenticatedRoutes = () => {
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate('/');
  }
  return (
    <div className="bg-gradient-to-r from-rose-300 to-emerald-200 h-[180vh]">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="users/:userId/employees/:employeeId" element={<ShowSingleEmployee />} />
        <Route path="users/employees/:employeeId/addresses" element={<Address />} />
        <Route path="users/employees/:employeeId/job_infos" element={<Jobinfo />} />
        <Route path="users/employees/:employeeId/contracts" element={<Contract />} />
        <Route path="users/employees/:employeeId/salaries" element={<Salary />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/add-Department" element={<AddDepartment />} />
        <Route path="/multi-step-form" element={<MultiStepForm />} />
        <Route path="/add-Employee" element={<AddEmployee />} />
        <Route path="/add-Address" element={<AddAddress />} />
        <Route path="/add-Contract" element={<AddContract />} />
        <Route path="users/:userId/employees/:employeeId/add-Attendance" element={<AddAttendance />} />
        <Route path="/add-JobInfo" element={<AddJobInfo />} />
        <Route path="users/:userId/employees/:employeeId/add-Salary" element={<AddSalary />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/add-Project" element={<AddProject />} />
        <Route path="/add-Report" element={<AddReport />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedRoutes;
