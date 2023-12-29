import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSalaryThunk } from '../../../redux/employee/salarySlice';

const Salary = () => {
  const dispatch = useDispatch();
  const { salary } = useSelector((state) => state.salary);
  const { employeeId } = useParams();

  useEffect(() => {
    dispatch(fetchSalaryThunk(employeeId));
  }, [dispatch, employeeId]);

  return (
    <div>
      <p className="font-bold">Salary</p>
      {salary.salary && salary.salary.length > 0 ? (
        <>
          {salary.salary.map((sal) => (
            <div key={sal.id}>
              <p>
                Salary:
                {' '}
                $
                {sal.salary_amount}
              </p>
              <p>
                Month:
                {' '}
                {sal.month}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p>No Salary found for this employee.</p>
      )}
    </div>
  );
};

export default Salary;
