import React from 'react';
import Label from '../text/Label';
import { joinClassName } from 'src/utils/stringUtils';

const CommonTextInput = ({
  containerClassName,
  labelText,
  inputType,
  inputClassName = '',
  placeholder,
  isRequiredField,
  onChange,
  onBlur,
  value,
  isError,
  errorMessage,
  inputID,
  isTouched,
  minTime,
  maxTime,
  isDisable,
  maxLength,
  name,
}) => {
  const checkInputClassName = () => {
    if (isError) return joinClassName([inputClassName, 'is-invalid']);
    else if (isTouched) {
      return joinClassName([inputClassName, 'is-valid']);
    } else return inputClassName;
  };
  console.log(errorMessage, isError, isTouched);
  return (
    <div className={containerClassName}>
      {labelText && <Label text={labelText} required={isRequiredField} labelID={inputID} />}
      <input
        type={inputType}
        className={checkInputClassName()}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e);
        }}
        onBlur={onBlur}
        value={value}
        id={inputID}
        name={name}
        autoComplete={'off'}
        min={minTime ?? null}
        max={maxTime ?? null}
        disabled={isDisable}
        maxLength={maxLength}
      />
      {isError && errorMessage && (
        <div>
          <small className={'text-danger'}> {errorMessage}</small>
        </div>
      )}
    </div>
  );
};

export default CommonTextInput;
