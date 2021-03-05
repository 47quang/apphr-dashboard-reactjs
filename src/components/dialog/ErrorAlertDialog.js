import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ErrorOutlineOutlined } from "@material-ui/icons";

//TODO: translate
const ErrorAlertDialog = ({ isVisible, handleClose }) => {
  return (
    <Dialog
      open={isVisible}
      onClose={handleClose}
      aria-labelledby="error-alert-dialog-title"
    >
      <DialogTitle id="error-alert-dialog-title" className="bg-danger">
        <div className="text-white" style={{ fontSize: 25 }}>
          <ErrorOutlineOutlined
            style={{ color: "white", fontSize: 40 }}
            className="mr-2"
          />
          Lỗi
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom className="text-justify">
          đây là dòng thông báo lỗi. Lưu ý rằng bạn cần nhớ rất nhiều thứ hay
          nhớ kĩ nhé djalfjdlf alkdjflaksdj
        </Typography>
      </DialogContent>
      <DialogActions className="align-center">
        <button
          autoFocus
          onClick={handleClose}
          className="btn btn-danger mx-auto"
        >
          CLOSE
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorAlertDialog;
