import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchDepartmentsThunk } from '../../redux/department/departmentsSlice';
import url from '../../redux/url';

const AddReport = () => {
  const { departments } = useSelector((state) => state.departments);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!departments || departments.length === 0) {
      dispatch(fetchDepartmentsThunk());
    }
  }, [departments, dispatch]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('0');
  const resetValues = () => {
    setName('');
    setDescription('');
    setDepartment('0');
  };

  const token = localStorage.getItem('token');
  const selectedDepartment = parseInt(department, 10);
  const addDepartment = async () => {
    const report = {
      name,
      description,
      department_id: department,
    };
    const response = await fetch(`${url}departments/${selectedDepartment}/reports`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });
    let returnResponse = '';
    if (response.ok) {
      returnResponse = await response.json();
    } else {
      throw new Error('Failed to create Report');
    }
    return returnResponse;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDepartment();
      resetValues();
      toast.success('Report created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section id="add-Report" className="flex flex-col items-center">
      <p className="text-center text-2xl">Add Report</p>
      <form className="sm:mt-8 flex flex-col gap-4 mt-4 w-1/2">
        <div>
          <label htmlFor="report-name">
            Report Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="report-name"
              placeholder="Enter a name"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="report-des">
            Description
            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write your description here!" rows={10} id="report-des" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div>
          <label htmlFor="report-dep">
            Department
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="0" className="option">Chose a Department</option>
              {departments.map((department) => (
                <option className="option" key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex gap-3">
          <button type="button" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2" onClick={resetValues}>Cancel</button>
          <button type="submit" className="border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-white hover:text-black text-white p-2" onClick={handleSubmit}>Add Report</button>
          <Link to="/reports" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2">
            Back
          </Link>
        </div>
      </form>
    </section>
  );
};

export default AddReport;
