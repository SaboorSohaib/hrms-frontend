import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchDepartmentsThunk } from '../../redux/department/departmentsSlice';
import { fetchReportsThunk } from '../../redux/report/reportsSlice';
import ReportUpdateModal from './ReportUpdateModal';
import url from '../../redux/url';

const Report = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);
  const { reportsByDepartment } = useSelector((state) => state.reports);

  useEffect(() => {
    if (departments && departments.length === 0) {
      dispatch(fetchDepartmentsThunk());
    }
  }, [departments, dispatch]);

  useEffect(() => {
    if (departments && departments.length > 0) {
      departments.forEach((currentDepartment) => {
        const departmentId = currentDepartment.id;
        if (!reportsByDepartment[departmentId]) {
          dispatch(fetchReportsThunk(departmentId));
        }
      });
    }
  }, [departments, reportsByDepartment, dispatch]);

  const token = localStorage.getItem('token');
  const deleteReport = async (departmentId, reportId) => {
    const response = await fetch(`${url}departments/${departmentId}/reports/${reportId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      toast.success('Report deleted successfully');
      dispatch(fetchReportsThunk(departmentId));
    } else {
      toast.error('Failed to delete Report');
    }
  };

  const [reportData, setReportData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (report) => {
    setReportData(report);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateReport = async (updatedReportData) => {
    try {
      const token = localStorage.getItem('token');
      const reportId = updatedReportData.id;
      const departmentId = updatedReportData.department_id;
      const response = await fetch(`${url}departments/${departmentId}/reports/${reportId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReportData), // Send the updated data
      });

      if (response.ok) {
        // If the update is successful, you can update the local state
        toast.success('Department updated successfully');
        closeModal();
        dispatch(fetchReportsThunk(departmentId));
      } else {
        toast.error('Failed to update Department');
      }
    } catch (error) {
      toast.error('An error occurred while updating the department');
    }
  };

  return (
    <section id="reports">
      <h2 className="text-center mt-3 text-4xl">All Reports</h2>
      {departments.map((department) => (
        <div key={department.id} className="border flex flex-col h-full items-center mt-3 p-3">
          <p>
            Department Name:
            {department.name}
          </p>
          <Link className="bg-blue-200 text-center p-2 w-28" to={`/add-Report?departmentId=${department.id}`}>Add Report</Link>
          {reportsByDepartment[department.id] && (
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Report Name</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportsByDepartment[department.id].map((report) => (
                  <tr key={report.id}>
                    <td className="border px-4 py-2">{report.name}</td>
                    <td className="border px-4 py-2">{report.description}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-green-500 hover:bg-green-400 p-2 rounded mr-2"
                        type="button"
                        onClick={() => openModal(report)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-400 p-2 rounded"
                        type="button"
                        onClick={() => deleteReport(department.id, report.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
      {reportData && (
        <ReportUpdateModal
          isOpen={isOpen}
          onClose={closeModal}
          reportData={reportData}
          onUpdate={updateReport}
        />
      )}
    </section>
  );
};

export default Report;
