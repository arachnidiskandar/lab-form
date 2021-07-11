import React from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, Container, Typography } from '@material-ui/core';
import Share from '@material-ui/icons/Share';

import { styled } from '@material-ui/core/styles';

const StyledContainer = styled(Container)({
  paddingBottom: '16px',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiTypography-h6': {
    textAlign: 'center',
  },
  '& .MuiButton-root': {
    marginTop: '20px',
  },
});
const ModalShare = ({ open, handleClose }) => {
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <StyledContainer>
        <DialogTitle id="simple-dialog-title">Questionário criado com sucesso</DialogTitle>
        <Typography>Clique no botão para gerar o link de compartilhamento</Typography>
        <Button variant="contained" size="large" color="primary" startIcon={<Share />}>
          Compartilhar
        </Button>
      </StyledContainer>
    </Dialog>
  );
};

export default ModalShare;
