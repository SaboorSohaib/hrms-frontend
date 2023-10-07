import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Address from './address/Address';
import Jobinfo from './job/Jobinfo';
import Contract from './contracts/Contract';
import Salary from './salary/Salary';
import Attendance from './attendance/Attendance';
import { fetchEmployeesThunk } from '../../redux/employee/employeesSlice';
import { fetchDepartmentsThunk } from '../../redux/department/departmentsSlice';

const ShowSingleEmployee = () => {
  const dispatch = useDispatch();
  const { userId, employeeId } = useParams();
  const { employeesByUser } = useSelector((state) => state.employees);
  const { departments } = useSelector((state) => state.departments);
  useEffect(() => {
    dispatch(fetchEmployeesThunk(userId));
    dispatch(fetchDepartmentsThunk());
  }, [dispatch, userId]);
  const employeesForUser = employeesByUser[userId];
  const employee = employeesForUser
    ? employeesForUser.find((emp) => emp.id === Number(employeeId))
    : null;
  return (
    <div>
      {employee ? (
        <div>
          <Link to="/employees" className="bg-blue-200 p-3">
            Back
          </Link>
          <div className="flex justify-center gap-5">
            <div>
              <p className="font-bold">Basic Info</p>
              <img src={employee.photo} alt="employee pic" width={100} height={100} />
              <p>
                First Name:
                {employee.first_name}
              </p>
              <p>
                Last Name:
                {employee.last_name}
              </p>
              <p>
                Email:
                {employee.email}
              </p>
              <p>
                Phone:
                {employee.phone}
              </p>
              <p>
                Gender:
                {employee.gender}
              </p>
              <p>
                Hire Date:
                {employee.hire_date}
              </p>
              <p>
                Department:
                {departments.map((department) => (
                  <span key={department.id}>
                    {department.id === employee.department_id && department.name}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <Address />
            </div>
            <div>
              <Contract />
            </div>
            <div>
              <Jobinfo />
            </div>
            <div>
              <Salary />
              <Link to={`/users/${userId}/employees/${employeeId}/add-Salary`} className="bg-blue-200 p-1">
                Add Salary
              </Link>
            </div>
            <div>
              <Attendance />
              <Link to={`/users/${userId}/employees/${employeeId}/add-Attendance`} className="bg-blue-200 p-1">
                Add Attendance
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Loadding...</p>
      )}
    </div>
  );
};

export default ShowSingleEmployee;
