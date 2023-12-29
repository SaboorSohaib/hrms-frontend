import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchEmployeesThunk } from '../../redux/employee/employeesSlice';
import { fetchUsersThunk } from '../../redux/user/usersSlice';
import EmployeeUpdateModal from './EmployeeUpdateModal';
import url from '../../redux/url';

const Employees = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { employeesByUser } = useSelector((state) => state.employees);
  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(fetchUsersThunk());
    }
  }, [users, dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      users.forEach((currentUser) => {
        const userId = currentUser.id;
        if (!employeesByUser[userId]) {
          dispatch(fetchEmployeesThunk(userId));
        }
      });
    }
  }, [users, employeesByUser, dispatch]);

  // Delete operation
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const handleDelete = async (id) => {
    const response = await fetch(`${url}users/${userId}/employees/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      toast.success('Employee deleted successfully');
      dispatch(fetchEmployeesThunk(userId));
    } else {
      toast.error('Failed to delete Employee');
    }
  };

  // Update operation
  const [employeeData, setEmployeeData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (employee) => {
    setEmployeeData(employee);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateEmployee = async (updatedEmployeeData) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      const employeeId = updatedEmployeeData.id;
      const response = await fetch(`${url}users/${userId}/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployeeData), // Send the updated data
      });

      if (response.ok) {
        // If the update is successful, you can update the local state
        toast.success('Employee updated successfully');
        closeModal();
        dispatch(fetchEmployeesThunk(userId));
      } else {
        toast.error('Failed to update Employee');
      }
    } catch (error) {
      toast.error('An error occurred while updating the employee');
    }
  };

  return (
    <section className="flex flex-col">
      <h2 className="text-center mt-3 text-4xl">All Employees</h2>
      <Link className="bg-blue-200 p-3 w-32" to={`/multi-step-form?userId=${userId}`}>Add Employee</Link>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Hire Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((currentUser) => (
            <React.Fragment key={currentUser.id}>
              {employeesByUser[currentUser.id] && (
              <>
                {employeesByUser[currentUser.id].map((employee) => (
                  <tr key={employee.id}>
                    <td className="border px-4 py-2">{employee.first_name}</td>
                    <td className="border px-4 py-2">{employee.last_name}</td>
                    <td className="border px-4 py-2">{employee.email}</td>
                    <td className="border px-4 py-2">{employee.phone}</td>
                    <td className="border px-4 py-2">{employee.gender}</td>
                    <td className="border px-4 py-2">{employee.hire_date}</td>
                    <td className="border px-4 py-2">
                      <a href={`/users/${currentUser.id}/employees/${employee.id}`} className="bg-blue-500 hover:bg-blue-400 p-2 rounded mr-2">
                        See All Info
                      </a>
                      <button
                        type="button"
                        className="bg-green-500 hover:bg-green-400 p-2 rounded mr-2"
                        onClick={() => openModal(employee)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-400 p-2 rounded"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {employeeData && (
        <EmployeeUpdateModal
          isOpen={isOpen}
          onClose={closeModal}
          employeeData={employeeData}
          onUpdate={updateEmployee}
        />
      )}
    </section>
  );
};

export default Employees;
