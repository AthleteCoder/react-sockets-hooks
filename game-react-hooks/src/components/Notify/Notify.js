import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { resetNotify } from "../../state/notify/notifyTypes";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Notify = ({ error, success, message, reset }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    reset();
    // setOpen(false);
  };

  const Success = () => {
    return (
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    );
  };

  const Error = () => {
    return (
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <>
      {success && <Success />}
      {error && <Error />}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(resetNotify()),
  };
};

export default connect(
  (state) => state.notifyReducer,
  mapDispatchToProps
)(Notify);
