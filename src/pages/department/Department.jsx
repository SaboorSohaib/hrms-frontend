import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { fetchDepartmentsThunk } from '../../redux/department/departmentsSlice';
import DepartmentUpdateModal from './DepartmentUpdateModal';
import url from '../../redux/url';

const Department = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);
  useEffect(() => {
    dispatch(fetchDepartmentsThunk());
  }, [dispatch]);

  const token = localStorage.getItem('token');
  const handleDelete = async (id) => {
    const response = await fetch(`${url}departments/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      toast.success('Employee deleted successfully');
      dispatch(fetchDepartmentsThunk());
    } else {
      toast.error('Failed to delete Employee');
    }
  };

  const [departmentData, setDepartmentData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (department) => {
    setDepartmentData(department);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateDepartment = async (updatedDepartmentData) => {
    try {
      const token = localStorage.getItem('token');
      const departmentId = updatedDepartmentData.id;
      const response = await fetch(`${url}departments/${departmentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDepartmentData), // Send the updated data
      });

      if (response.ok) {
        // If the update is successful, you can update the local state
        toast.success('Department updated successfully');
        closeModal();
        dispatch(fetchDepartmentsThunk());
      } else {
        toast.error('Failed to update Department');
      }
    } catch (error) {
      toast.error('An error occurred while updating the department');
    }
  };

  return (
    <section id="departments">
      <h2 className="text-center mt-3 text-4xl"> All Departments</h2>
      <Link className="bg-blue-200 p-3" to="/add-Department">Add Department</Link>
      {departments.map((department) => (
        <div key={department.id} className="flex justify-center">
          <table className="table-auto" key={department.id}>
            <thead>
              <tr>
                <th className="px-4 py-2">Department Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr key={department.id}>
                <td className="border px-4 py-2">{department.name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 hover:bg-green-400 p-2 rounded mr-2"
                    type="button"
                    onClick={() => openModal(department)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-400 p-2 rounded"
                    type="button"
                    onClick={() => handleDelete(department.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      {departmentData && (
        <DepartmentUpdateModal
          isOpen={isOpen}
          onClose={closeModal}
          departmentData={departmentData}
          onUpdate={updateDepartment}
        />
      )}
    </section>
  );
};

export default Department;
