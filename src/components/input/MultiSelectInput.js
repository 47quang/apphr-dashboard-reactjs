import React from 'react';

import Select from 'react-select';
import { joinClassName } from 'src/utils/stringUtils';

const MultiSelectInput = ({
  values,
  containerClassName,
  selectClassName = '',
  onChange,
  listValues,
  placeholder,
  setValues,
  key,
  error,
  touched,
  onBlur,
  isError,
  isTouched,
  errorMessage,
  noOptionsMessage,
  t,
}) => {
  const checkSelectClassName = () => {
    if (isError) return joinClassName([selectClassName, 'is-invalid-border']);
    else if (isTouched) {
      return joinClassName([selectClassName, 'is-valid-border']);
    } else return selectClassName;
  };
  return (
    <>
      <Select
        className={checkSelectClassName()}
        value={values}
        isMulti
        getOptionLabel={(option) => {
          let rValue = option.name;
          if (option?.branchname) rValue = option.branchname + ' - ' + rValue;
          else if (option?.departmentName) rValue = option.branchName + ' - ' + option.departmentName + ' - ' + rValue;
          return rValue;
        }}
        getOptionValue={(option) => {
          return option.id;
        }}
        placeholder={placeholder}
        options={listValues}
        onBlur={onBlur}
        onChange={onChange}
        noOptionsMessage={noOptionsMessage}
      />
      {isError && errorMessage && (
        <div>
          <small className={'text-danger'}> {errorMessage}</small>
        </div>
      )}
    </>
  );
};
export default MultiSelectInput;
