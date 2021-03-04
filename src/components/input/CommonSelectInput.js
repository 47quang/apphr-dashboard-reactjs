import React from "react";
import Label from "../label/label";
import PropTypes from 'prop-types';



const CommonSelectInput = ({
  containerClassName,
  labelText,
  selectClassName = "",
  isRequiredField,
  onChange,
  onBlur,
  value,
  isError,
  errorMessage,
  inputID,
  isTouched,
  lstSelectOptions = [],
}) => {
  return (
    <div className={containerClassName}>
      <Label text={labelText} required={isRequiredField} />
      <select
        className={selectClassName}
        onChange={onChange}
        onBlur={onBlur}
        value={value} 
        id={inputID}
        required={isRequiredField}
      >
        {lstSelectOptions.map((val, index) => (
          <option value={val} key={index}>{val}</option>
        ))}
      </select>
      {isError && errorMessage && (
        <div>
          {/* <FontAwesomeIcon
            icon={faExclamationCircle}
            className={"text-danger"}
          /> */}
          <small className={"text-danger"}> {errorMessage}</small>
        </div>
      )}
    </div>
  );
};
CommonSelectInput.propTypes = {};

export default CommonSelectInput;
