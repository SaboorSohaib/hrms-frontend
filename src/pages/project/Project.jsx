import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';
import { fetchDepartmentsThunk } from '../../redux/department/departmentsSlice';
import { fetchProjectsThunk } from '../../redux/project/projectSlice';
import ProjectUpdateModal from './ProjectUpdateModal';
import url from '../../redux/url';

const Project = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);
  const { projectsByDepartment } = useSelector((state) => state.projects);

  useEffect(() => {
    if (!departments || departments.length === 0) {
      dispatch(fetchDepartmentsThunk());
    }
  }, [departments, dispatch]);

  useEffect(() => {
    if (departments && departments.length > 0) {
      departments.forEach((currentDepartment) => {
        const departmentId = currentDepartment.id;
        if (!projectsByDepartment[departmentId]) {
          dispatch(fetchProjectsThunk(departmentId));
        }
      });
    }
  }, [departments, projectsByDepartment, dispatch]);

  const token = localStorage.getItem('token');
  const deleteProject = async (departmentId, projectId) => {
    const response = await fetch(`${url}departments/${departmentId}/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      toast.success('Project deleted successfully');
      dispatch(fetchProjectsThunk(departmentId));
    } else {
      toast.error('Failed to delete Project');
    }
  };

  const [projectData, setProjectData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (project) => {
    setProjectData(project);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateProject = async (updatedProjectData) => {
    try {
      const token = localStorage.getItem('token');
      const projectId = updatedProjectData.id;
      const departmentId = updatedProjectData.department_id;
      const response = await fetch(`${url}departments/${departmentId}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProjectData), // Send the updated data
      });

      if (response.ok) {
        // If the update is successful, you can update the local state
        toast.success('Department updated successfully');
        closeModal();
        dispatch(fetchProjectsThunk(departmentId));
      } else {
        toast.error('Failed to update Department');
      }
    } catch (error) {
      toast.error('An error occurred while updating the department');
    }
  };

  return (
    <section id="projects">
      <h2 className="text-center mt-3 text-4xl"> All Projects</h2>
      {departments.map((department) => (
        <div key={department.id} className="flex flex-col flex-wrap justify-between items-center h-full mt-5">
          <p>
            Department Name:
            {department.name}
          </p>
          <Link className="bg-blue-200 text-center p-2 w-28" to={`/add-Project?departmentId=${department.id}`}>Add Project</Link>
          {projectsByDepartment[department.id] && (
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Project Name</th>
                <th className="px-4 py-2">Starting Date</th>
                <th className="px-4 py-2">Ending Date</th>
                <th className="px-4 py-2">Budget</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectsByDepartment[department.id].map((project) => (
                <tr key={project.id}>
                  <td className="border px-4 py-2">{project.name}</td>
                  <td className="border px-4 py-2">{project.starting_date}</td>
                  <td className="border px-4 py-2">{project.ending_date}</td>
                  <td className="border px-4 py-2">{`${project.budget}$`}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 hover:bg-green-400 p-2 rounded mr-2"
                      type="button"
                      onClick={() => openModal(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-400 p-2 rounded"
                      type="button"
                      onClick={() => deleteProject(department.id, project.id)}
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
      {projectData && (
        <ProjectUpdateModal
          isOpen={isOpen}
          onClose={closeModal}
          projectData={projectData}
          onUpdate={updateProject}
        />
      )}
    </section>
  );
};

export default Project;
