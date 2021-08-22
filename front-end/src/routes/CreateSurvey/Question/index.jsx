import React, { useEffect, useState, useCallback } from 'react';
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
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
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

const Question = ({
  register,
  item,
  index,
  control,
  deleteQuestion,
  error,
  watch,
  setError,
  clearErrors,
  getValues,
}) => {
  const [questionType, setQuestionType] = useState(QUESTION_TYPE.SINGLE_TEXTBOX);
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });
  // const const [options, setOptions] = useState(initialState);
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

  const uniqueFieldsValidator = () => {
    const options = getValues(`questions.${index}.options`).map((option) => option.optionValue);
    if (options[0] === '' && options[1] === '') {
      return;
    }
    if (new Set(options).size !== options.length) {
      setError(`questions.${index}.options`, { message: 'Uma ou mais opções iguais' });
    } else {
      clearErrors(`questions.${index}.options`);
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
                error={error && !!error?.[index]?.questionTitle}
                defaultValue={`${item.questionTitle}`}
                margin="normal"
                fullWidth
                variant="outlined"
                label="Título da pergunta"
                required
                helperText={error && error?.[index]?.questionTitle?.message}
                {...field}
              />
            )}
          />

          <FormControl margin="normal" required variant="outlined" error={error && error?.[index]?.questionType}>
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
              <MenuItem value={QUESTION_TYPE.DROPDOWN}>Escolha múltipla</MenuItem>
              <MenuItem value={QUESTION_TYPE.CHECKBOXES}>Caixas de verificação</MenuItem>
            </Select>
            {error && error?.[index]?.questionType && (
              <FormHelperText>{error?.[index]?.questionType?.message}</FormHelperText>
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
                control={control}
                name={`questions.${index}.options.${nestIndex}.optionValue`}
                error={error && error?.[index]?.options?.[nestIndex]?.optionValue?.message}
                removeMethod={() => remove(nestIndex)}
                checkEqualOptionCb={uniqueFieldsValidator}
                watch={watch}
              />
            ))}
            <div>
              <Button color="primary" onClick={() => append({ optionValue: '' })}>
                Adicionar Outra opção
              </Button>
            </div>
          </div>
        )}
        {error && <FormHelperText error>{error?.[index]?.options?.message}</FormHelperText>}
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
