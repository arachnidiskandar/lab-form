import React, { useState } from 'react';

import { Card, CardContent, Button, Container, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { styled } from '@material-ui/core/styles';
import axios from 'axios';
import Question from './Question';
import Toaster from '../../shared/Toaster';

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
  const [toasterState, setToasterState] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/forms/create', data);
      setToasterState({ message: 'Enviado com sucesso', type: 'success' });
    } catch (error) {
      setToasterState({ error, type: 'error' });
    }
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
      <Toaster toasterState={toasterState} onClose={() => setToasterState({ open: false })} />
    </PageContainer>
  );
};

export default AnswerSurvey;
