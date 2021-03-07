import React from "react";
import { joinClassName } from "src/utils/stringUtils";

const Label = ({ text, className, required, labelID }) => {
  return (
    <label
      className={joinClassName([className, "font-weight-bold"])}
      htmlFor={labelID}
    >
      {required ? <span className="text-danger">*</span> : <span>&ensp;</span>}{" "}
      {text}
    </label>
  );
};

export default Label;
