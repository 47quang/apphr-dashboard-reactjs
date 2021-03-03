import React from "react";

const Label = ({ text, className, required }) => {
  return (
    <label className={className}>
      {required ? <span className="text-danger">*</span> : ""} {text}
    </label>
  );
};

export default Label;
