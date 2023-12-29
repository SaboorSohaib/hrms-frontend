import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AddEmployee from './AddEmployee';
import AddAddress from './address/AddAddress';
import AddContract from './contracts/AddContract';
import AddJobInfo from './job/AddJobInfo';

const MultiStepForm = () => {
  const [employeeData, setEmployeeData] = useState(null);

  const handleAddEmployee = (newEmployeeData) => {
    // When an employee is added, update the employeeData state
    setEmployeeData(newEmployeeData);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [stepCompleted, setStepCompleted] = useState(false);
  const isPreviousDisabled = currentStep === 1;
  const isNextDisabled = currentStep === 4;
  const moveToNextStep = () => {
    // Check if the current step's form is completed before moving to the next step.
    if (stepCompleted) {
      setCurrentStep(currentStep + 1);
      setStepCompleted(false); // Reset stepCompleted for the next step.
    } else {
      // Display an error message or take appropriate action (e.g., show a validation message).
      toast.error('Please complete the current step before proceeding.');
    }
  };

  const moveToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
    setStepCompleted(false); // Reset stepCompleted when moving to the previous step.
  };

  // Define a function to set stepCompleted based on your form validation logic.
  const handleStepComplete = (isComplete) => {
    setStepCompleted(isComplete);
  };

  const previousButtonClass = isPreviousDisabled
    ? 'border rounded-md transition ease-in-out delay-100 bg-gray-300 text-gray-500 p-2' // Disabled
    : 'border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-blue-500 hover:text-black text-white p-2'; // Enabled
  const nextButtonClass = isNextDisabled
    ? 'border rounded-md transition ease-in-out delay-100 bg-gray-300 text-gray-500 p-2' // Disabled
    : 'border rounded-md transition ease-in-out delay-100 bg-blue-700 hover:bg-blue-500 hover:text-black text-white p-2'; // Enabled

  return (
    <div className="h-[150vh]">
      {currentStep === 1 && (
        <AddEmployee
          onAddEmployee={handleAddEmployee}
          moveToNextStep={moveToNextStep}
          handleStepComplete={handleStepComplete}
        />
      )}

      {currentStep === 2 && (
        <AddAddress
          employeeData={employeeData}
          moveToNextStep={moveToNextStep}
          moveToPreviousStep={moveToPreviousStep}
          handleStepComplete={handleStepComplete}
        />
      )}

      {currentStep === 3 && (
        <AddContract
          employeeData={employeeData}
          moveToNextStep={moveToNextStep}
          moveToPreviousStep={moveToPreviousStep}
          handleStepComplete={handleStepComplete}
        />
      )}

      {currentStep === 4 && (
        <AddJobInfo
          employeeData={employeeData}
          moveToNextStep={moveToNextStep}
          moveToPreviousStep={moveToPreviousStep}
          handleStepComplete={handleStepComplete}
        />
      )}
      <button type="button" disabled={isPreviousDisabled} className={previousButtonClass} onClick={moveToPreviousStep}>Previous</button>
      <button type="button" disabled={isNextDisabled} className={nextButtonClass} onClick={moveToNextStep}>Next</button>
    </div>
  );
};

export default MultiStepForm;
