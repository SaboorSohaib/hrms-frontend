import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import url from '../../../redux/url';

const AddContract = ({ employeeData, handleStepComplete }) => {
  const employeeId = employeeData ? employeeData.id : null;
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [contractType, setContractType] = useState('');

  const resetValues = () => {
    setStartingDate('');
    setEndingDate('');
    setContractType('');
  };

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const addContract = async () => {
    const contract = {
      starting_date: startingDate,
      ending_date: endingDate,
      contract_type: contractType,
      employee_id: employeeId,
    };
    const response = await fetch(
      `${url}users/${userId}/employees/${employeeId}/contracts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contract),
      },
    );
    let returnResponse = '';
    if (response.ok) {
      returnResponse = await response.json();
    } else {
      throw new Error('Failed to create Contract');
    }
    return returnResponse;
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContract();
      resetValues();
      toast.success('Contract created successfully');
      handleStepComplete(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section id="add-Employee" className="flex flex-col items-center">
      <p className="text-2xl">Add Contract</p>
      <form className="sm:mt-8 flex flex-col gap-4 mt-4 w-1/2">
        <div>
          <label htmlFor="emp-start">
            Starting Date
            <input
              type="date"
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
              placeholder="Enter a date"
              id="emp-start"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="emp-end">
            Ending Date
            <input
              type="date"
              value={endingDate}
              onChange={(e) => setEndingDate(e.target.value)}
              placeholder="Enter a date"
              id="emp-end"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="emp-type">
            Contract Type
            <input
              type="text"
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              placeholder="Full Time"
              id="emp-type"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div className="flex gap-3">
          <button type="button" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2" onClick={resetValues}>Cancel</button>
          <button type="submit" className="border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-white hover:text-black text-white p-2" onClick={handelSubmit}>Add Contract</button>
        </div>
      </form>
    </section>
  );
};

AddContract.propTypes = {
  employeeData: PropTypes.shape({
    id: PropTypes.number,
  }),
  handleStepComplete: PropTypes.func.isRequired,
};

AddContract.defaultProps = {
  employeeData: null,
};

export default AddContract;
