import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EmployeeUpdateModal = ({
  isOpen, onClose, employeeData, onUpdate,
}) => {
  const [formValues, setFormValues] = useState(employeeData);
  if (!isOpen) return null;
  const handleUpdate = () => {
    onUpdate(formValues);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-500">
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Edit Employee</p>
            <button
              type="button"
              className="modal-close cursor-pointer z-50"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <form className="lg:flex lg:flex-row lg:flex-wrap">
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </span>
              <input
                type="text"
                name="first_name"
                value={formValues.first_name}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </span>
              <input
                type="text"
                name="last_name"
                value={formValues.last_name}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </span>
              <input
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </span>
              <input
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </span>
              <select
                name="gender"
                value={formValues.gender}
                onChange={handleInputChange}
              >
                <option value="">Chose your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Photo
              </span>
              <input
                type="text"
                name="photo"
                value={formValues.photo}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Hire Date
              </span>
              <input
                type="date"
                name="hire_date"
                value={formValues.hire_date}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="modal-close px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
EmployeeUpdateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  employeeData: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    hire_date: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EmployeeUpdateModal;
