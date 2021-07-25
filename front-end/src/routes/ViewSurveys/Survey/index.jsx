import React from 'react';

import { Card, CardContent, Button, Typography, Snackbar } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Share from '@material-ui/icons/Share';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';

const StyledSurvey = styled(Card)({
  margin: '15px 0',
  '& .MuiCardContent-root': {
    display: 'flex',
    '& div:first-child': {
      flexBasis: '70%',
    },
    '& div:last-child': {
      display: 'flex',
      justifyContent: 'space-around',
      flexBasis: '30%',
    },
  },
});
const Survey = ({ data, onDeleteClick, onCopy }) => {
  const history = useHistory();

  const handleEditClick = () => {
    history.push(`/editar-questionario/${data.id}`);
  };
  return (
    <StyledSurvey>
      <CardContent>
        <div>
          <Typography variant="h6">{data.title}</Typography>
        </div>
        <div>
          <Button
            onClick={() => onCopy(`localhost:3000/responder-questionario/${data.id}`)}
            variant="contained"
            size="small"
            color="primary"
            startIcon={<Share />}
          >
            Copiar link
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={<Edit />}
            onClick={() => handleEditClick()}
          >
            Editar
          </Button>
          <Button
            onClick={() => onDeleteClick(data.id)}
            variant="contained"
            size="small"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Excluir
          </Button>
        </div>
      </CardContent>
    </StyledSurvey>
  );
};

export default Survey;
