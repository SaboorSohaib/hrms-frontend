import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJobinfoThunk } from '../../../redux/employee/jobinfoSlice';

const Jobinfo = () => {
  const dispatch = useDispatch();
  const { jobinfo } = useSelector((state) => state.jobinfo);
  const { employeeId } = useParams();

  useEffect(() => {
    dispatch(fetchJobinfoThunk(employeeId));
  }, [dispatch, employeeId]);

  return (
    <div>
      <p className="font-bold">Job info</p>
      {jobinfo.jobinfo && (
        <>
          <p>
            Title:
            {jobinfo.jobinfo.job_title}
          </p>
        </>
      )}
    </div>
  );
};

export default Jobinfo;
