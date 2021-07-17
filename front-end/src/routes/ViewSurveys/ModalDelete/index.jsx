import React from 'react';

import { Button, DialogTitle, Dialog, DialogActions } from '@material-ui/core';

const ModalDelete = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Você tem certeza que deseja deletar o questionário?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;
