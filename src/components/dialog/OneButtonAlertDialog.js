import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

const OneButtonAlertDialog = ({
  isOpen,
  handleClose,
  title,
  message,
  titleCancel,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          {titleCancel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
OneButtonAlertDialog.propTypes= {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    titleCancel: PropTypes.string,
}
export default OneButtonAlertDialog;
