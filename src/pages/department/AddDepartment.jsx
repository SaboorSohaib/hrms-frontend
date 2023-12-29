import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import url from '../../redux/url';

const AddDepartment = () => {
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');
  const resetValues = () => {
    setName('');
  };
  const addDepartment = async () => {
    const department = {
      name,
    };
    const response = await fetch(`${url}departments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(department),
    });
    let returnResponse = '';
    if (response.ok) {
      returnResponse = await response.json();
    } else {
      throw new Error('Failed to create Department');
    }
    return returnResponse;
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDepartment();
      resetValues();
      toast.success('Department created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section id="add-Department" className="flex flex-col items-center">
      <p className="text-center text-2xl">Add Department</p>
      <form className="sm:mt-8 flex flex-col gap-4 mt-4 w-1/2">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex gap-3">
          <button type="button" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2" onClick={resetValues}>Cancel</button>
          <button type="submit" className="border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-white hover:text-black text-white p-2" onClick={handelSubmit}>Add Department</button>
          <Link to="/departments" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2">Back</Link>
        </div>
      </form>
    </section>
  );
};

export default AddDepartment;
