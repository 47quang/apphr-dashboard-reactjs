import React from 'react';
const FormHeader = ({ text = '' }) => {
  return (
    <>
      <div className="text-left">
        <h3>{text}</h3>
      </div>
      <hr className="mb-3 pb-2" />
    </>
  );
};
export default FormHeader;
