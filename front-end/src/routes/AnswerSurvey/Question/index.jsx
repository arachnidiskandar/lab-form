import React from 'react';
import { Card, CardContent, TextField, Button, Container, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const QUESTION_TYPE = {
  text: 'text',
};

const StyledQuestion = styled(Card)({
  margin: '15px 0',
});
const Question = ({ question, register, error, index }) => {
  return (
    <StyledQuestion>
      <CardContent>
        <Typography variant="h5">{question.title}</Typography>
        <TextField
          error={error && !!error[`question${index}`]}
          margin="normal"
          fullWidth
          multiline
          variant="outlined"
          label="Resposta"
          type="text"
          required
          helperText={error && error[`question${index}`]?.message}
          {...register(`question${index}`, { required: 'Resposta Obrigatória' })}
        />
      </CardContent>
    </StyledQuestion>
  );
};

export default Question;
