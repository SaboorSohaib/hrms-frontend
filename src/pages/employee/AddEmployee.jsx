import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import url from '../../redux/url';

const AddEmployee = ({ onAddEmployee, handleStepComplete }) => {
  const { departments } = useSelector((state) => state.departments);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState('');
  const [hiredate, setHireDate] = useState('');
  const [department, setDepartment] = useState('0');

  const resetValues = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setGender('');
    setPhoto('');
    setHireDate('');
    setDepartment('0');
  };

  const body = document.querySelector('body');
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      body.style.cursor = 'wait';
      const response = await axios.post('https://api.imgbb.com/1/upload?key=8b33c005b4494d49345774dd0cde37db', formData);
      setPhoto(response.data.data.url);
    } catch (error) {
      body.style.cursor = 'default';
    } finally {
      body.style.cursor = 'default';
    }
  };

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const addEmployee = async () => {
    const employee = {
      first_name: firstname,
      last_name: lastname,
      email,
      phone,
      gender,
      photo,
      hire_date: hiredate,
      department_id: department,
      user_id: userId,
    };

    try {
      const response = await fetch(`${url}users/${userId}/employees`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        const returnResponse = await response.json();
        onAddEmployee(returnResponse); // Pass the employee data to the parent component
        resetValues();
        toast.success('Employee created successfully');
        handleStepComplete(true); // Pass the flag to the parent component
      } else {
        throw new Error('Failed to create Employee');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEmployee();
  };
  return (
    <section id="add-Employee" className="flex flex-col items-center">
      <p className="text-2xl">Add Employee</p>
      <form onSubmit={handleSubmit} className="sm:mt-8 flex flex-col gap-4 mt-4 w-1/2">
        <div>
          <label htmlFor="emp-name">
            First Name
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ahmad"
              id="emp-name"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="emp-last">
            Last Name
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Khan"
              id="emp-last"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="emp-email">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ahmad@gmail.com"
              id="emp-email"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="emp-phone">
            Phone
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+9378234433"
              id="emp-phone"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="emp-gender">
            Gender
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              id="emp-gender"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Chose your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="emp-photo">
            Photo
            <input
              type="file"
              onChange={handleImageUpload}
              placeholder="Enter a photo (optional)"
              id="emp-photo"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="emp-hire">
            Hire Date
            <input
              type="date"
              value={hiredate}
              onChange={(e) => setHireDate(e.target.value)}
              placeholder="Enter a hire date"
              id="emp-hire"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="emp-dep">
            Department
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              id="emp-dep"
              required
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
          <button type="submit" className="border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-white hover:text-black text-white p-2">Add Employee</button>
          <Link to="/employees" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2">
            Back
          </Link>
        </div>
      </form>
    </section>
  );
};

AddEmployee.apply.propTypes = {
  onAddEmployee: PropTypes.func.isRequired,
};

AddEmployee.propTypes = {
  handleStepComplete: PropTypes.func.isRequired,
};
export default AddEmployee;
