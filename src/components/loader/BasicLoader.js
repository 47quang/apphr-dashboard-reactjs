import React from "react";
import "./basic_loader_style.css";

const BasicLoader = ({ isVisible }) => {
  return (
    <div
      className="loader mx-auto my-auto"
      style={{
        display: `${isVisible ? "block" : "none"}`,
      }}
    />
  );
};

export default BasicLoader;
