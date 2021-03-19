import React from 'react';
import Label from '../text/Label';

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
  name,
  lstSelectOptions = [],
}) => {
  const hash = lstSelectOptions.reduce((acc, val) => {
    acc[val.id] = val;
    return acc;
  }, {});
  return (
    <div className={containerClassName}>
      {labelText && <Label text={labelText} required={isRequiredField} labelID={inputID} />}
      <select
        className={selectClassName}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={inputID}
        name={inputID}
        required={isRequiredField}
        disabled={isDisable}
      >
        <option value={0}>{placeholder}</option>
        {lstSelectOptions.length > 0 ? (
          lstSelectOptions.map((val, index) => {
            return (
              <option value={hash[val.id]?.id} key={index}>
                {val.name}
              </option>
            );
          })
        ) : (
          <></>
        )}
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
