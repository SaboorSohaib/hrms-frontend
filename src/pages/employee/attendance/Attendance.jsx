import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAttendanceThunk } from '../../../redux/employee/attendanceSlice';

const Attendance = () => {
  const dispatch = useDispatch();
  const { attendance } = useSelector((state) => state.attendance);
  const { employeeId } = useParams();

  useEffect(() => {
    dispatch(fetchAttendanceThunk(employeeId));
  }, [dispatch, employeeId]);

  return (
    <div>
      <p className="font-bold">Attendance</p>
      {attendance.attendance && attendance.attendance.length > 0 ? (
        <>
          {attendance.attendance.map((attend) => (
            <div key={attend.id}>
              <p>
                Date:
                {' '}
                {attend.date}
              </p>
              <p>
                Clock In:
                {' '}
                {attend.clock_in}
              </p>
              <p>
                Clock Out:
                {' '}
                {attend.clock_out}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p>Attendance Data is not available!</p>
      )}
    </div>
  );
};

export default Attendance;
