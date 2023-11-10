import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import url from '../../../redux/url';

const AddSalary = () => {
  const { employeeId } = useParams();
  const [salary, setSalary] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState(null);

  const resetValues = () => {
    setSalary('');
    setMonth('');
    setError(null);
  };

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  const addSalary = async () => {
    try {
      const salaryData = {
        salary_amount: salary,
        month,
        employee_id: employeeId,
      };
      const response = await fetch(
        `${url}users/${userId}/employees/${employeeId}/salaries`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(salaryData),
        },
      );

      if (response.ok) {
        const returnResponse = await response.json();
        resetValues();
        toast.success('Salary created successfully');
        return returnResponse;
      }

      const errorResponse = await response.json();

      if (response.status === 422 && errorResponse.error === 'DuplicateSalaryError') {
        throw new Error('Salary for this month has already been paid.');
      }

      throw new Error('Failed to create Salary');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSalary();
    } catch (error) {
      // Handle other errors if needed
      toast.error(error.message);
    }
  };

  return (
    <section id="add-Employee" className="flex flex-col items-center">
      <p className="text-2xl">Add Salary</p>
      <form className="sm:mt-8 flex flex-col gap-4 mt-4 w-1/2">
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <label htmlFor="emp-salary">
            Salary
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="500"
              id="emp-salary"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="emp-month">
            Month
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Enter a clock in"
              id="emp-month"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="flex gap-3">
          <button type="button" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2" onClick={resetValues}>Cancel</button>
          <button type="submit" className="border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-white hover:text-black text-white p-2" onClick={handleSubmit}>Add Salary</button>
          <Link to="/employees" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2">
            Back
          </Link>
        </div>
      </form>
    </section>
  );
};

export default AddSalary;
