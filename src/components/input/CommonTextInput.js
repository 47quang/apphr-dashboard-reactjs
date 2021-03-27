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
  isDisable,
  maxLength,
}) => {
  const checkInputClassName = () => {
    if (isError) return joinClassName([inputClassName, 'is-invalid']);
    else if (isTouched) {
      return joinClassName([inputClassName, 'is-valid']);
    } else return inputClassName;
  };

  return (
    <div className={containerClassName}>
      {labelText && <Label text={labelText} required={isRequiredField} labelID={inputID} />}
      <input
        type={inputType}
        className={checkInputClassName()}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={inputID}
        required={isRequiredField}
        autoComplete={'off'}
        min={minTime ?? null}
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
