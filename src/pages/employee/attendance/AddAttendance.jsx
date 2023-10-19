import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import url from '../../../redux/url';

const AddAttendance = () => {
  const { employeeId } = useParams();
  const [date, setDate] = useState('');
  const [clockIn, setClockIn] = useState('');
  const [clockOut, setClockOut] = useState('');

  const resetValues = () => {
    setDate('');
    setClockIn('');
    setClockOut('');
  };

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const addAttendance = async () => {
    const attendance = {
      date,
      clock_in: clockIn,
      clock_out: clockOut,
      employee_id: employeeId,
    };
    const response = await fetch(
      `${url}users/${userId}/employees/${employeeId}/attendances`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendance),
      },
    );
    let returnResponse = '';
    if (response.ok) {
      returnResponse = await response.json();
    } else {
      throw new Error('Failed to create Attendance');
    }
    return returnResponse;
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAttendance();
      resetValues();
      toast.success('Attendance created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section id="add-Employee" className="flex flex-col items-center">
      <p className="text-2xl">Add Attendance</p>
      <form className="sm:mt-8 flex flex-col gap-4 mt-4 w-1/2">
        <div>
          <label htmlFor="date">
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter a date"
              required
              id="date"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="time-in">
            Time In
            <input
              type="time"
              value={clockIn}
              onChange={(e) => setClockIn(e.target.value)}
              placeholder="Enter a clock in"
              required
              id="time-in"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="time-out">
            Time Out
            <input
              type="time"
              value={clockOut}
              onChange={(e) => setClockOut(e.target.value)}
              placeholder="Enter a clock out"
              required
              id="time-out"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div className="flex gap-3">
          <button type="button" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2" onClick={resetValues}>Cancel</button>
          <button type="submit" className="border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-white hover:text-black text-white p-2" onClick={handelSubmit}>Add Attendance</button>
          <Link to={`/users/${userId}/employees/${employeeId}`} className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2">
            Back
          </Link>
        </div>
      </form>
    </section>
  );
};

export default AddAttendance;
