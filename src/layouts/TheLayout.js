import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { TheContent, TheSidebar } from "./index";

const TheLayout = ({ location }) => {
  const token = useSelector((state) => state.user.token);
  if (!token) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <div className="c-body">
          <TheContent />
        </div>
      </div>
    </div>
  );
};

export default TheLayout;
