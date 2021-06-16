import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REDUX_STATE } from 'src/stores/states';

const AlertSnackbar = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    switch (reason) {
      case 'timeout': {
        dispatch({ type: REDUX_STATE.notification.SET_OPEN });
        break;
      }
      case 'clickaway':
        break;
      default: {
        dispatch({ type: REDUX_STATE.notification.SET_OPEN });
        break;
      }
    }
  };
  return (
    <Snackbar open={notification.open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert variant="filled" severity={notification.type} onClose={handleClose}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
