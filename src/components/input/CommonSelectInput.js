import React from "react";
import Label from "../label/label";

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
      <Label text={labelText} required={isRequiredField} labelID={inputID} />
      <select
        className={selectClassName}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={inputID}
        required={isRequiredField}
      >
        {lstSelectOptions.map((val, index) => (
          <option value={val} key={index}>
            {val}
          </option>
        ))}
      </select>
      {isError && errorMessage && (
        <div>
          <small className={"text-danger"}> {errorMessage}</small>
        </div>
      )}
    </div>
  );
};
CommonSelectInput.propTypes = {};

export default CommonSelectInput;
