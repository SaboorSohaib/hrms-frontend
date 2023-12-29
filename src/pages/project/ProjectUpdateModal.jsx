import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProjectUpdateModal = ({
  isOpen, onClose, projectData, onUpdate,
}) => {
  const [formValues, setFormValues] = useState(projectData);
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
            <p className="text-2xl font-bold">Edit Project</p>
            <button
              type="button"
              className="modal-close cursor-pointer z-50"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <form className="flex flex-col">
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </span>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Starting Date
              </span>
              <input
                type="text"
                name="starting_date"
                value={formValues.starting_date}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Ending Date
              </span>
              <input
                type="text"
                name="ending_date"
                value={formValues.ending_date}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Budget
              </span>
              <input
                type="text"
                name="duration"
                value={formValues.duration}
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
ProjectUpdateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  projectData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    starting_date: PropTypes.string.isRequired,
    ending_date: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProjectUpdateModal;
