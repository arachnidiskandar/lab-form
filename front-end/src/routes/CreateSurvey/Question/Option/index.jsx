import React, { useEffect } from 'react';

import { TextField, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { styled } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
import { QUESTION_TYPE } from '../../../AnswerSurvey/Question';

const StyledOption = styled('div')({
  width: '100%',
  display: 'flex',
  marginTop: '10px',
  '& .MuiTextField-root': {
    margin: '10px',
    flexBasis: '75%',
  },
  '& svg:first-child': {
    alignSelf: 'center',
  },
});

const MultipleChoice = ({ type, register, name, option, control, error, removeMethod }) => {
  return (
    <StyledOption>
      {type === QUESTION_TYPE.MULTIPLE_CHOICES ? <RadioButtonUncheckedIcon /> : <CheckBoxOutlineBlankIcon />}
      <Controller
        control={control}
        name={name}
        rules={{ required: 'Campo Obrigatório' }}
        render={({ field }) => (
          <TextField error={error} defaultValue={name} placeholder="Adicione uma opção" helperText={error} {...field} />
        )}
      />
      <IconButton aria-label="delete" size="small" onClick={() => removeMethod()}>
        <DeleteIcon />
      </IconButton>
    </StyledOption>
  );
};

export default MultipleChoice;
