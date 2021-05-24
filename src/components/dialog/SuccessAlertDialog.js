import { Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CheckCircleOutlineOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next/*';

const SuccessAlertDialog = ({ isVisible, handleClose, msg }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(isVisible ?? true);
  return (
    <Dialog open={visible} onClose={handleClose} aria-labelledby="success-alert-dialog-title">
      <DialogTitle id="success-alert-dialog-title" className="bg-success">
        <div className="text-white" style={{ fontSize: 35 }}>
          <CheckCircleOutlineOutlined style={{ color: 'white', fontSize: 60 }} className="mr-2" />
          {t('title.success')}
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom className="text-justify">
          {msg}
        </Typography>
      </DialogContent>
      <DialogActions className="align-center">
        <button
          autoFocus
          onClick={(e) => {
            if (handleClose && isVisible) handleClose();
            else setVisible(false);
          }}
          className="btn btn-success mx-auto"
        >
          {t('label.ok_all_cap')}
        </button>
      </DialogActions>
    </Dialog>
  );
};
SuccessAlertDialog.propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func,
};
export default SuccessAlertDialog;
