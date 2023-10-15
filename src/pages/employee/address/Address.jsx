import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAddressThunk } from '../../../redux/employee/addressSlice';

const Address = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.address);
  const { employeeId } = useParams();

  useEffect(() => {
    dispatch(fetchAddressThunk(employeeId));
  }, [dispatch, employeeId]);
  return (
    <div>
      <p className="font-bold">Address</p>
      {address.address && (
      <>
        <p>
          Province:
          {address.address.province}
        </p>
        <p>
          District:
          {address.address.distract}
        </p>
      </>
      )}
    </div>
  );
};

export default Address;
