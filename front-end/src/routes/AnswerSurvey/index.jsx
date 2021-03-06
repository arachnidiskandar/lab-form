import React, { useState, useEffect } from 'react';

import { Button, Container, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { styled } from '@material-ui/core/styles';
import axios from 'axios';
import Question, { QUESTION_TYPE } from './Question';
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
  '& .questions-container': {
    marginTop: '5vh',
  },
});

const AnswerSurvey = () => {
  const [survey, setSurvey] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [toasterState, setToasterState] = useState({ open: false });
  const { pathname } = useLocation();
  const surveyId = pathname.split('/')[2];

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const getSurvey = async (id) => {
    try {
      const { data } = await axios.get(`/forms/${id}`);
      setSurvey(data);
    } catch (error) {
      setToasterState({ open: true, message: error.message, type: error });
    }
  };
  useEffect(() => {
    getSurvey(surveyId);
  }, []);

  const onSubmit = async (data) => {
    const responses = Object.values(data);
    const formatedForm = { form: surveyId };
    formatedForm.answers = survey.questions.map((question, index) => {
      if (QUESTION_TYPE[question.questionType] === QUESTION_TYPE.CHECKBOXES) {
        const formatedAnswer = responses[index].map((answer) => answer !== undefined);
        return {
          type: QUESTION_TYPE[question.questionType],
          content: formatedAnswer,
        };
      }
      return {
        type: QUESTION_TYPE[question.questionType],
        content: responses[index],
      };
    });

    try {
      await axios.post('/forms/submit', formatedForm);
      setToasterState({ open: true, message: 'Question??rio respondido', type: 'success' });
      setIsAnswered(true);
    } catch (error) {
      setToasterState({ open: true, message: error.message, type: 'error' });
    }
  };

  return (
    <>
      <PageContainer>
        {!isAnswered ? (
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Typography variant="h3">{survey?.title}</Typography>
            <Typography variant="subtitle1">{survey?.description}</Typography>
            <div className="questions-container">
              {survey &&
                survey.questions.map((question, index) => {
                  return (
                    <Question
                      key={question.questionTitle}
                      index={index}
                      question={question}
                      register={register}
                      error={errors}
                      options={question.options}
                      control={control}
                    />
                  );
                })}
            </div>

            <Button type="submit" variant="contained" size="large" color="primary">
              Finalizar question??rio
            </Button>
          </form>
        ) : (
          <Typography>Voc?? pode fechar a p??gina</Typography>
        )}
        <Toaster toasterState={toasterState} onClose={() => setToasterState({ open: false })} />
      </PageContainer>
    </>
  );
};

export default AnswerSurvey;
