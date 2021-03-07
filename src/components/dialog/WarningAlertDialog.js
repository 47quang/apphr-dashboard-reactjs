import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import { WarningOutlined } from "@material-ui/icons";

//TODO: translate
const WarningAlertDialog = ({
  isVisible,
  title,
  warningMessage,
  titleConfirm,
  handleConfirm,
  titleCancel,
  handleCancel,
}) => {
  return (
    <Dialog
      open={isVisible}
      onClose={handleCancel}
      aria-labelledby="warning-alert-dialog-title"
    >
      <DialogTitle id="warning-alert-dialog-title" className="bg-warning">
        <div className="text-white" style={{ fontSize: 25 }}>
          <WarningOutlined
            style={{ color: "white", fontSize: 40 }}
            className="mr-2"
          />
          {title}
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom className="text-justify">
          {warningMessage}
        </Typography>
      </DialogContent>
      <DialogActions className="align-center">
        <button
          autoFocus
          onClick={handleCancel}
          className="btn btn-secondary mx-auto text-white"
        >
          {titleCancel}
        </button>
        <button
          onClick={handleConfirm}
          className="btn btn-warning mx-auto text-white"
        >
          {titleConfirm}
        </button>
      </DialogActions>
    </Dialog>
  );
};
WarningAlertDialog.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  warningMessage: PropTypes.string,
  titleConfirm: PropTypes.string,
  handleConfirm: PropTypes.func,
  titleCancel: PropTypes.string,
  handleCancel: PropTypes.func,
};
export default WarningAlertDialog;
