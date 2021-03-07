import React from "react";
import Label from "../text/label";

const CommonMultipleTextInput = ({
  containerClassName,
  labelText,
  inputClassName = "",
  onChange,
  onBlur,
  value,
  inputID,
  rows = 5,
}) => {
  return (
    <div className={containerClassName}>
      <Label text={labelText} labelID={inputID} />
      <textarea
        className={inputClassName}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={inputID}
        autoComplete={"off"}
        rows={rows}
      />
    </div>
  );
};

export default CommonMultipleTextInput;
