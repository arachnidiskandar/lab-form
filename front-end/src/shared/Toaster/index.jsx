import React, { useState } from 'react';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Toaster = ({ toasterState, onClose }) => {
  return (
    <Snackbar open={toasterState.open} autoHideDuration={5000}>
      <Alert onClose={onClose} severity={toasterState?.type} elevation={6} variant="filled">
        {toasterState.message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
