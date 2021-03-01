import React from 'react';
import { TheContent, TheSidebar, TheHeader } from './index';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const TheLayout = ({ location }) => {
  const token = useSelector((state) => state.user.token);
  if (!token) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
  }
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        {/* <TheFooter /> */}
      </div>
    </div>
  );
};

export default TheLayout;
