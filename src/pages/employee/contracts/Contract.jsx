import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchContractThunk } from '../../../redux/employee/contractSlice';

const Contract = () => {
  const dispatch = useDispatch();
  const { contract } = useSelector((state) => state.contract);
  const { employeeId } = useParams();
  useEffect(() => {
    dispatch(fetchContractThunk(employeeId));
  }, [dispatch, employeeId]);

  return (
    <div>
      <p className="font-bold">Contracts</p>
      {contract.contract && contract.contract.length > 0 ? (
        <>
          {contract.contract.map((c) => (
            <div key={c.id}>
              <p>
                Contract Start Date:
                {' '}
                {c.starting_date}
              </p>
              <p>
                Contract End Date:
                {' '}
                {c.ending_date}
              </p>
              <p>
                Contract Type:
                {' '}
                {c.contract_type}
              </p>
            </div>
          ))}
        </>
      ) : (
        <p>No contracts found for this employee.</p>
      )}
    </div>
  );
};

export default Contract;
