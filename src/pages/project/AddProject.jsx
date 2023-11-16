import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchDepartmentsThunk } from '../../redux/department/departmentsSlice';
import url from '../../redux/url';

const AddProject = () => {
  const { departments } = useSelector((state) => state.departments);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!departments || departments.length === 0) {
      dispatch(fetchDepartmentsThunk());
    }
  }, [departments, dispatch]);
  const [name, setName] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [budget, setBudget] = useState('');
  const [department, setDepartment] = useState('0');

  const resetValues = () => {
    setName('');
    setStartingDate('');
    setEndingDate('');
    setBudget('');
    setDepartment('0');
  };

  const token = localStorage.getItem('token');
  const selectedDepartment = parseInt(department, 10);
  const addProject = async () => {
    const project = {
      name,
      starting_date: startingDate,
      ending_date: endingDate,
      budget,
      department_id: selectedDepartment,
    };
    const response = await fetch(`${url}departments/${selectedDepartment}/projects`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    let returnResponse = '';
    if (response.ok) {
      returnResponse = await response.json();
    } else {
      throw new Error('Failed to create Project');
    }
    return returnResponse;
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProject();
      resetValues();
      toast.success('Project created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section id="add-Project" className="flex flex-col items-center">
      <p className="text-center text-2xl">Add Project</p>
      <form className="sm:mt-8 flex flex-col gap-4 mt-4 w-1/2">
        <div>
          <label htmlFor="project-name">
            Project Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Blog"
              required
              id="project-name"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="satrt-date">
            Starting Date
            <input
              type="date"
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
              placeholder="Enter a Starting Date"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="end-date">
            Ending Date
            <input
              type="date"
              value={endingDate}
              onChange={(e) => setEndingDate(e.target.value)}
              placeholder="Enter a Ending Date"
              required
              id="end-date"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="budget">
            Budegt
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="5000"
              required
              id="budget"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
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
        </div>
        <div className="flex gap-3">
          <button type="button" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2" onClick={resetValues}>Cancel</button>
          <button type="submit" className="border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-white hover:text-black text-white p-2" onClick={handelSubmit}>Add Project</button>
          <Link to="/projects" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2">
            Back
          </Link>
        </div>
      </form>
    </section>
  );
};

export default AddProject;
