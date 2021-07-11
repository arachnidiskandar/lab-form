import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  CardActions,
  Button,
  FormHelperText,
} from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { styled } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';

const StyledQuestion = styled(Card)({
  margin: '15px 0',
  '& .MuiCardContent-root': {
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiTextField-root': {
      flexBasis: '80%',
    },
  },
  '& .MuiSelect-select': {
    width: '150px',
  },
  '& .MuiCardActions-root': {
    justifyContent: 'flex-end',
    padding: '16px',
  },
});
const Question = ({ register, item, index, control, deleteQuestion, error }) => {
  const [questionType, setQuestionType] = useState('');

  const handleChange = (event) => {
    setQuestionType(event.target.value);
  };
  console.log(error);
  return (
    <StyledQuestion>
      <CardContent>
        <Controller
          control={control}
          name={`questions.${index}.questionTitle`}
          rules={{ required: 'Campo Obrigatório' }}
          render={({ field }) => (
            <TextField
              error={error && !!error[index]?.questionTitle}
              defaultValue={`${item.questionTitle}`}
              margin="normal"
              fullWidth
              variant="outlined"
              label="Título da pergunta"
              required
              helperText={error && error[index]?.questionTitle?.message}
              {...field}
            />
          )}
        />

        <FormControl
          margin="normal"
          required
          variant="outlined"
          error={error && error[index]?.questionType && !questionType}
        >
          <InputLabel id="select-type-question">Tipo da resposta</InputLabel>
          <Select
            defaultValue={`${item.questionType}`}
            labelId="select-type-question"
            id="select-type-question"
            {...register(`questions.${index}.questionType`, { required: 'Campo Obrigatório' })}
            value={questionType}
            label="Tipo da resposta"
            onChange={handleChange}
          >
            <MenuItem value="text">Texto</MenuItem>
          </Select>
          {error && error[index]?.questionType && !questionType && (
            <FormHelperText>{error[index]?.questionType?.message}</FormHelperText>
          )}
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => deleteQuestion(index)}
          variant="contained"
          color="secondary"
          startIcon={<DeleteOutline />}
        >
          Excluir
        </Button>
      </CardActions>
    </StyledQuestion>
  );
};

export default Question;
