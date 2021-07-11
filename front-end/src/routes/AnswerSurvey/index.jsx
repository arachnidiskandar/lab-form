import React, { useState } from 'react';

import { Card, CardContent, TextField, Button, Container, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { styled } from '@material-ui/core/styles';
import Question from './Question';

const PageContainer = styled(Container)({
  padding: '20px 0',
  '& form': {
    display: 'flex',
    flexDirection: 'column',
  },
  '& .MuiButton-containedPrimary': {
    alignSelf: 'flex-end',
  },
});

const mockSurvey = {
  title: 'Título Mockado',
  description: 'descrição Mockada',
  questions: [
    {
      id: 1,
      questionTitle: 'Pergunta 1',
      questionType: 'text',
    },
    {
      id: 2,
      questionTitle: 'Pergunta 2',
      questionType: 'text',
    },
    {
      id: 3,
      questionTitle: 'Pergunta 3',
      questionType: 'text',
    },
  ],
};
const AnswerSurvey = () => {
  const [survey, setSurvey] = useState(mockSurvey);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Card>
          <CardContent>
            <Typography variant="h3">{survey.title}</Typography>
            <Typography variant="subtitle1">{survey.description}</Typography>
          </CardContent>
        </Card>
        {survey.questions.map((question) => {
          return <Question key={question.id} question={question} register={register} error={errors} />;
        })}
        <Button type="submit" variant="contained" size="large" color="primary">
          Finalizar questionário
        </Button>
      </form>
    </PageContainer>
  );
};

export default AnswerSurvey;
