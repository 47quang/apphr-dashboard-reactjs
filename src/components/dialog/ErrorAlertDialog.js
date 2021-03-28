import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ErrorOutlineOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next/*';

//TODO: translate
const ErrorAlertDialog = ({ isVisible, handleClose, msg }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={isVisible} onClose={handleClose} aria-labelledby="error-alert-dialog-title">
      <DialogTitle id="error-alert-dialog-title" className="bg-danger">
        <div className="text-white" style={{ fontSize: 25 }}>
          <ErrorOutlineOutlined style={{ color: 'white', fontSize: 40 }} className="mr-2" />
          {t('title.error')}
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom className="text-justify">
          {msg}
        </Typography>
      </DialogContent>
      <DialogActions className="align-center">
        <button autoFocus onClick={handleClose} className="btn btn-danger mx-auto">
          {t('label.close_all_cap')}
        </button>
      </DialogActions>
    </Dialog>
  );
};
ErrorAlertDialog.propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func,
};
export default ErrorAlertDialog;
