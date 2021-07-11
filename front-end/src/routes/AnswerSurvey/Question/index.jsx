import React from 'react';
import { Card, CardContent, TextField, Button, Container, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledQuestion = styled(Card)({
  margin: '15px 0',
});
const Question = ({ question, register, error }) => {
  return (
    <StyledQuestion>
      <CardContent>
        <Typography variant="h5">{question.questionTitle}</Typography>
        <TextField
          error={error && !!error[`question${question.id}`]}
          margin="normal"
          fullWidth
          multiline
          variant="outlined"
          label="Resposta"
          type="text"
          required
          helperText={error && error[`question${question.id}`]?.message}
          {...register(`question${question.id}`, { required: 'Resposta Obrigatória' })}
        />
      </CardContent>
    </StyledQuestion>
  );
};

export default Question;
