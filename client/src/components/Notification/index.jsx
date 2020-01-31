import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = (options = {}) => {
  console.log(options);
  const { msg = "Hello World", open = false, handleClose = () => {} } = options;
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
