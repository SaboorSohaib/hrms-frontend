import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesThunk } from '../redux/employee/employeesSlice';
import { fetchDepartmentsThunk } from '../redux/department/departmentsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('user_id');
  const { employeesByUser } = useSelector((state) => state.employees);
  const employeesArray = employeesByUser[userId] || [];
  const { departments } = useSelector((state) => state.departments);

  useEffect(() => {
    dispatch(fetchEmployeesThunk(userId));
    dispatch(fetchDepartmentsThunk());
  }, [dispatch, userId]);

  return (
    <section id="home">
      <div className="flex justify-center items-center mt-10 gap-2">
        <div className="flex flex-col items-center bg-blue-400 p-5 w-28">
          <h2>Employees</h2>
          <p>{employeesArray.length}</p>
        </div>
        <div className="flex flex-col items-center  bg-blue-300 p-5 w-28">
          <h2>Departments</h2>
          <p>{departments.length}</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
