import React, { useEffect, useState } from 'react';
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
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Options from './Option';
import { QUESTION_TYPE } from '../../AnswerSurvey/Question';

const StyledQuestion = styled(Card)({
  margin: '15px 0',
  '& .MuiSelect-select': {
    width: '150px',
  },
  '& .MuiCardActions-root': {
    justifyContent: 'flex-end',
    padding: '16px',
  },
});

const StyledTitleTypeContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiTextField-root': {
    flexBasis: '80%',
  },
});

const Question = ({ register, item, index, control, deleteQuestion, error }) => {
  const [questionType, setQuestionType] = useState(QUESTION_TYPE.SINGLE_TEXTBOX);
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  const handleQuestionTypeChange = (type) => {
    setQuestionType(type);
    if (type === QUESTION_TYPE.SINGLE_TEXTBOX) {
      remove();
      return;
    }
    if (fields.length === 0) {
      append([{ optionValue: '' }, { optionValue: '' }]);
    }
  };

  return (
    <StyledQuestion>
      <CardContent>
        <StyledTitleTypeContainer>
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

          <FormControl margin="normal" required variant="outlined" error={error && error[index]?.questionType}>
            <InputLabel id="select-type-question">Tipo da resposta</InputLabel>
            <Select
              defaultValue={`${item.questionType}`}
              labelId="select-type-question"
              id="select-type-question"
              {...register(`questions.${index}.questionType`, { required: 'Campo Obrigatório' })}
              label="Tipo da resposta"
              onChange={(event) => handleQuestionTypeChange(event.target.value)}
            >
              <MenuItem value={QUESTION_TYPE.SINGLE_TEXTBOX}>Texto</MenuItem>
              <MenuItem value={QUESTION_TYPE.MULTIPLE_CHOICES}>Escolha múltipla</MenuItem>
              <MenuItem value={QUESTION_TYPE.CHECKBOXES}>Caixas de verificação</MenuItem>
            </Select>
            {error && error[index]?.questionType && (
              <FormHelperText>{error[index]?.questionType?.message}</FormHelperText>
            )}
          </FormControl>
        </StyledTitleTypeContainer>
        {questionType !== QUESTION_TYPE.SINGLE_TEXTBOX && (
          <div>
            {fields.map((option, nestIndex) => (
              <Options
                key={option.id}
                type={questionType}
                register={register}
                option={option}
                control={control}
                name={`questions.${index}.options.${nestIndex}.optionValue`}
                error={error && error[index]?.options[nestIndex]?.optionValue?.message}
                removeMethod={() => remove(nestIndex)}
              />
            ))}
            <div>
              <Button color="primary" onClick={() => append({ optionValue: '' })}>
                Adicionar Outra opção
              </Button>
            </div>
          </div>
        )}
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
