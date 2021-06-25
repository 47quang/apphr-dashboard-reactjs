import React from 'react';
import { joinClassName } from 'src/utils/stringUtils';
import Label from '../text/Label';
import './input_style.css';
const CommonSelectInput = ({
  containerClassName,
  labelText,
  selectClassName = '',
  isRequiredField,
  onChange,
  onBlur,
  value,
  isError,
  errorMessage,
  inputID,
  isTouched,
  placeholder,
  isDisable,
  isHidden,
  name,
  lstSelectOptions = [],
}) => {
  const hash = lstSelectOptions.reduce((acc, val) => {
    acc[val.id] = val;
    return acc;
  }, {});
  const checkSelectClassName = () => {
    if (isError) return joinClassName([selectClassName, 'is-invalid-border']);
    else if (isTouched) {
      return joinClassName([selectClassName, 'is-valid-border']);
    } else return selectClassName;
  };
  return (
    <div className={containerClassName} hidden={isHidden}>
      {labelText && <Label text={labelText} required={isRequiredField} labelID={inputID} />}
      <select
        className={checkSelectClassName()}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={inputID}
        name={inputID}
        required={isRequiredField}
        disabled={isDisable}
      >
        <option value={0}>{placeholder}</option>
        {lstSelectOptions.length > 0 &&
          lstSelectOptions.map((val, index) => {
            return (
              <option value={hash[val.id]?.id} key={index}>
                {val.name}
              </option>
            );
          })}
      </select>
      {isError && errorMessage && (
        <div>
          <small className={'text-danger'}> {errorMessage}</small>
        </div>
      )}
    </div>
  );
};
CommonSelectInput.propTypes = {};

export default CommonSelectInput;
