/* eslint-disable no-use-before-define */
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import Label from '../text/Label';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
    fontWeight: 400,
    fontSize: '0.875em',
    lineHeight: 1.5,
    backgroundClip: 'padding-box',
    userSelect: 'none',
  },
  autoField: {
    width: '100%',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  resize: {
    fontSize: '0.875em',
    height: 14,
  },
}));

const CommonAutoCompleteInput = ({
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
  // const hash = lstSelectOptions.reduce((acc, val) => {
  //   acc[val.id] = val;
  //   return acc;
  // }, {});
  const classes = useStyles();

  return (
    <div className={containerClassName} hidden={isHidden}>
      {labelText && <Label text={labelText} required={isRequiredField} labelID={inputID} />}
      <Autocomplete
        className={classes.autoField}
        options={lstSelectOptions ?? []}
        style={{ height: 35 }}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option) => option.id}
        noOptionsText={placeholder}
        onBlur={onBlur}
        onChange={(e, v) => {
          if (v) {
            e.target.value = v.id;
          }
          onChange(e);
        }}
        renderInput={(params) => {
          params.InputProps.classes = {
            input: classes.resize,
          };
          return (
            <TextField
              {...params}
              className={classes.textField}
              size="small"
              disabled={isDisable}
              value={value}
              id={inputID}
              placeholder={placeholder}
              name={name}
              required={isRequiredField}
              variant="outlined"
            />
          );
        }}
      />

      {isError && errorMessage && (
        <div>
          <small className={'text-danger'}> {errorMessage}</small>
        </div>
      )}
    </div>
  );
};

export default CommonAutoCompleteInput;
