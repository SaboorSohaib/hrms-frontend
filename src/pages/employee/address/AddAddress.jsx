import React, { useState } from 'react';
import PropType from 'prop-types';
import { toast } from 'react-toastify';
import url from '../../../redux/url';

const AddAddress = ({ employeeData, handleStepComplete }) => {
  const employeeId = employeeData ? employeeData.id : null;
  const [province, setProvince] = useState('');
  const [distract, setDistract] = useState('');
  const resetValues = () => {
    setProvince('');
    setDistract('');
  };

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const addAddress = async () => {
    const address = {
      province,
      distract,
      employee_id: employeeId,
    };
    const response = await fetch(
      `${url}users/${userId}/employees/${employeeId}/addresses`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
      },
    );
    let returnResponse = '';
    if (response.ok) {
      returnResponse = await response.json();
    } else {
      throw new Error('Failed to create Address');
    }
    return returnResponse;
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAddress();
      resetValues();
      toast.success('Address created successfully');
      handleStepComplete(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section id="add-Employee" className="flex flex-col items-center">
      <p className="text-2xl">Add Address</p>
      <form className="sm:mt-8 flex flex-col gap-4 mt-4 w-1/2">
        <div>
          <label htmlFor="emp-province">
            Province
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="Kabul"
              id="emp-province"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div>
          <label htmlFor="emp-distract">
            Distract
            <input
              type="text"
              value={distract}
              onChange={(e) => setDistract(e.target.value)}
              placeholder="Bagrami"
              id="emp-distract"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div className="flex gap-3">
          <button type="button" className="border rounded-md transition ease-in-out delay-100 bg-white hover:bg-blue-700 hover:text-white text-black p-2" onClick={resetValues}>Cancel</button>
          <button type="submit" className="border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-white hover:text-black text-white p-2" onClick={handelSubmit}>Add Address</button>
        </div>
      </form>
    </section>
  );
};

AddAddress.propTypes = {
  employeeData: PropType.shape({
    id: PropType.number,
  }),
  handleStepComplete: PropType.func.isRequired,
};

AddAddress.defaultProps = {
  employeeData: null,
};

export default AddAddress;
