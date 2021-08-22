import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';

export const QUESTION_TYPE = {
  SINGLE_TEXTBOX: 'SINGLE_TEXTBOX',
  text: 'SINGLE_TEXTBOX',
  CHECKBOXES: 'CHECKBOXES',
  DROPDOWN: 'DROPDOWN',
  MULTIPLE_CHOICES: 'DROPDOWN',
};

const StyledQuestion = styled(Card)({
  margin: '15px 0',
});
const Question = ({ question, register, error, index, options, control }) => {
  const renderQuestionChoice = () => {
    return (
      <FormControl component="fieldset">
        <RadioGroup
          defaultValue={`question${index}`}
          {...register(`question${index}`, { required: 'Resposta Obrigatória' })}
        >
          {options.map((option) => (
            <FormControlLabel value={option.optionValue} control={<Radio />} label={option.optionValue} />
          ))}
        </RadioGroup>
      </FormControl>
    );
  };
  const renderQuestionCheckBox = () => {
    return (
      <FormControl component="fieldset">
        <FormGroup>
          {options.map((option, checkboxIndex) => (
            <FormControlLabel
              control={
                <Controller
                  name={`question${index}.${checkboxIndex}`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      onChange={(e) => field.onChange(e.target.checked)}
                      checked={field.value || false}
                      {...field}
                    />
                  )}
                />
              }
              label={option.optionValue}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  };

  const renderQuestionText = () => (
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
  );

  return (
    <StyledQuestion>
      <CardContent>
        <Typography variant="h5">{question.questionTitle}</Typography>
        {question.questionType === QUESTION_TYPE.SINGLE_TEXTBOX && renderQuestionText()}
        {question.questionType === QUESTION_TYPE.CHECKBOXES && renderQuestionCheckBox()}
        {question.questionType === QUESTION_TYPE.MULTIPLE_CHOICES && renderQuestionChoice()}
      </CardContent>
    </StyledQuestion>
  );
};
export default Question;
