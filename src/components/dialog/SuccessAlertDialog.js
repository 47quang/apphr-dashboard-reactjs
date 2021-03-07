import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CheckCircleOutlineOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";

//TODO: translate
const SuccessAlertDialog = ({ isVisible, handleClose }) => {
  return (
    <Dialog
      open={isVisible}
      onClose={handleClose}
      aria-labelledby="success-alert-dialog-title"
    >
      <DialogTitle id="success-alert-dialog-title" className="bg-success">
        <div className="text-white" style={{ fontSize: 35 }}>
          <CheckCircleOutlineOutlined
            style={{ color: "white", fontSize: 60 }}
            className="mr-2"
          />
          Thành công
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom className="text-justify">
          Bạn đã đăng kí thành công. Xin chúc mừng
        </Typography>
      </DialogContent>
      <DialogActions className="align-center">
        <button
          autoFocus
          onClick={handleClose}
          className="btn btn-success mx-auto"
        >
          OK
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
