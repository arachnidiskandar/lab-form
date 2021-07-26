import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/UseFetch';
import LoadingBar from '../../shared/LoadingBar';
import AnswersList from './AnswersList';

const PageContainer = styled(Container)({
  padding: '20px 0',
  '& .respostas-container': {
    marginTop: '5vh',
  },
  '& .MuiCard-root': {
    marginBottom: '20px',
    '& h5': {
      paddingBottom: '10px',
    },
  },
});
const ViewAnswers = () => {
  const { pathname } = useLocation();
  const surveyId = pathname.split('/')[2];
  const [loading, questions] = useFetch(`/forms/answers/${surveyId}`);
  const [, survey] = useFetch(`/forms/${surveyId}`);
  const [formatedQuestions, setFormatedQuestions] = useState(null);

  useEffect(() => {
    const answers = survey?.questions?.map((question, index) => {
      const questionAnswers = questions.map((answer) => answer[index]);
      return { title: question.title, answers: questionAnswers };
    });
    setFormatedQuestions(answers);
  }, [questions, survey]);
  return (
    <>
      <PageContainer>
        <Typography variant="h4">Respostas</Typography>
        <div className="respostas-container">
          {formatedQuestions && formatedQuestions.map((question) => <AnswersList question={question} />)}
        </div>
      </PageContainer>
      {loading && <LoadingBar isLoadingFinished={loading} />}
    </>
  );
};

export default ViewAnswers;
