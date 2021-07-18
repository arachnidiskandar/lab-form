import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { Card, CardContent, TextField, Button, Container, Typography, Snackbar } from '@material-ui/core';

const PageContainer = styled(Container)({
  padding: '20px 0',
});
const EditSurvey = () => {
  const [originalSurvey, setOriginalSurvey] = useState(null);
  const [editedSurvey, setEditedSurvey] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  return (
    <PageContainer>
      <div>
        <Typography variant="h4">title</Typography>
      </div>
      <div>
        <Typography variant="h4">Descrição:</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit aliquid, unde voluptate fugit dolorum assumenda
          odit iste ducimus doloribus, iusto quibusdam magni quas aut minima facere deleniti perferendis soluta earum!
        </Typography>
      </div>
      <div>
        {isEditing && (
          <>
            <Button variant="contained" size="large" color="primary">
              Salvar modificações
            </Button>
            <Button variant="contained" size="large" color="primary">
              Cancelar modificações
            </Button>
          </>
        )}
      </div>
      <Typography variant="h4">Perguntas:</Typography>
    </PageContainer>
  );
};

export default EditSurvey;
