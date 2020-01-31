import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = (options = {}) => {
  const {
    msg = "Hello World",
    open = false,
    handleClose = () => {},
    type = "info"
  } = options;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
