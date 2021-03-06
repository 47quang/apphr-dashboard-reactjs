import React from "react";

const Label = ({ text, className, required, labelID }) => {
  return (
    <label className={className} htmlFor={labelID}>
      {required ? <span className="text-danger">*</span> : <span>&ensp;</span>}{" "}
      {text}
    </label>
  );
};

export default Label;
