import React from 'react';
import { joinClassName } from 'src/utils/stringUtils';
import Label from '../text/Label';

const CommonMultipleTextInput = ({
  containerClassName,
  labelText,
  inputClassName = '',
  onChange,
  onBlur,
  value,
  inputID,
  rows = 5,
  isRequiredField,
  isError,
  errorMessage,
  isTouched,
  placeholder,
}) => {
  const checkInputClassName = () => {
    if (isError) return joinClassName([inputClassName, 'is-invalid']);
    else if (isTouched) {
      return joinClassName([inputClassName, 'is-valid']);
    } else return inputClassName;
  };
  return (
    <div className={containerClassName}>
      <Label text={labelText} required={isRequiredField} labelID={inputID} />
      <textarea
        className={checkInputClassName()}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={inputID}
        autoComplete={'off'}
        rows={rows}
        required={isRequiredField}
        placeholder={placeholder}
      />
      {isError && errorMessage && (
        <div>
          <small className={'text-danger'}> {errorMessage}</small>
        </div>
      )}
    </div>
  );
};

export default CommonMultipleTextInput;
