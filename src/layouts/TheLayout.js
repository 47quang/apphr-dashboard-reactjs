import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTE_PATH } from 'src/constants/key';
import { TheContent, TheSidebar } from './index';
import TheHeader from './TheHeader';
import { REDUX_STATE } from 'src/stores/states';

const TheLayout = (props) => {
  const { location } = props;
  const token = useSelector((state) => state.user.token);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

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

  const handleClose = (event, reason) => {
    if (reason === 'timeout') {
      dispatch({ type: REDUX_STATE.notification.SET_OPEN });
    }
  };
  return (
    <div className="c-app c-default-layout" style={{ overflow: 'hidden' }}>
      <TheSidebar />
      <div className="c-wrapper" style={{ overflow: 'hidden' }}>
        <TheHeader {...props} />
        <Snackbar open={notification.open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert variant="filled" severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>
        <div className="c-body" style={{ overflow: 'hidden' }}>
          <TheContent />
        </div>
      </div>
    </div>
  );
};

export default TheLayout;
