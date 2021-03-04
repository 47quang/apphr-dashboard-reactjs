import React from "react";
import Label from "../label/label";
import { joinClassName } from "src/utils/stringUtils";

const CommonTextInput = ({
  containerClassName,
  labelText,
  inputType,
  inputClassName = "",
  placeholder,
  isRequiredField,
  onChange,
  onBlur,
  value,
  isError,
  errorMessage,
  inputID,
  isTouched,
}) => {
  const checkInputClassName = () => {
    if (isError) return joinClassName([inputClassName, "is-invalid"]);
    else if (isTouched) {
      return joinClassName([inputClassName, "is-valid"]);
    } else return inputClassName;
  };
  return (
    <div className={containerClassName}>
      <Label text={labelText} required={isRequiredField} />
      <input
        type={inputType}
        className={checkInputClassName()}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={inputID}
        required={isRequiredField}
        autoComplete={"off"}
      />
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

export default CommonTextInput;
