import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import url from '../../../redux/url';

const AddJobInfo = ({ employeeData, handleStepComplete }) => {
  const employeeId = employeeData ? employeeData.id : null;
  const [jobTitle, setJobTitle] = useState('');

  const resetValues = () => {
    setJobTitle('');
  };

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const addJobInfo = async () => {
    const jobInfo = {
      job_title: jobTitle,
      employee_id: employeeId,
    };
    const response = await fetch(
      `${url}users/${userId}/employees/${employeeId}/job_infos`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobInfo),
      },
    );
    let returnResponse = '';
    if (response.ok) {
      returnResponse = await response.json();
    } else {
      throw new Error('Failed to create Job Info');
    }
    return returnResponse;
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await addJobInfo();
      resetValues();
      toast.success('Job Info created successfully');
      handleStepComplete(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section id="add-Employee" className="flex flex-col items-center">
      <p className="text-2xl">Add Job Info</p>
      <form className="sm:mt-8 flex flex-col gap-4 mt-4 w-1/2">
        <div>
          <label htmlFor="emp-job">
            Job Title
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Software Developer"
              id="emp-job"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="flex gap-3">
          <button type="button" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2" onClick={resetValues}>Cancel</button>
          <button type="submit" className="border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-white hover:text-black text-white p-2" onClick={handelSubmit}>Add Job Info</button>
          <Link to="/employees" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2">
            Back
          </Link>
        </div>
      </form>
    </section>
  );
};

AddJobInfo.propTypes = {
  employeeData: PropTypes.shape({
    id: PropTypes.number,
  }),
  handleStepComplete: PropTypes.func.isRequired,
};

AddJobInfo.defaultProps = {
  employeeData: null,
};

export default AddJobInfo;
