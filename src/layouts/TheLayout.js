import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AlertSnackbar from 'src/components/alert_snackbar/AlertSnackbar';
import { ROUTE_PATH } from 'src/constants/key';
import { TheContent, TheSidebar } from './index';
import TheHeader from './TheHeader';

const TheLayout = (props) => {
  const { location } = props;
  const token = useSelector((state) => state.user.token);

  if (!token) {
    return (
      <Redirect
        to={{
          pathname: ROUTE_PATH.LOGIN,
          state: { from: location },
        }}
      />
    );
  }

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader {...props} />
        <AlertSnackbar />
        <div className="c-body">
          <TheContent />
        </div>
      </div>
    </div>
  );
};

export default TheLayout;
