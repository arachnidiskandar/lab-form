import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import useFetch from '../../hooks/UseFetch';
import LoadingBar from '../../shared/LoadingBar';
import AnswersList from './AnswersList';
import AnswersChart from './AnswersChart';
import { QUESTION_TYPE } from '../AnswerSurvey/Question';

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

const NoAnswserContainer = styled('div')({
  textAlign: 'center',
  color: '#a9a9a9',
  '& svg': {
    fontSize: '15vh',
  },
});
const ViewAnswers = () => {
  const { pathname } = useLocation();
  const surveyId = pathname.split('/')[2];
  const [loading, questions] = useFetch(`/forms/answers/${surveyId}`);
  // const [loading, questions] = useFetch(`/forms/answers/-MhWGa5Hpi1dS2z5MGNz`);
  const [, survey] = useFetch(`/forms/${surveyId}`);
  const [formatedQuestions, setFormatedQuestions] = useState(null);

  useEffect(() => {
    if (!survey || !questions) {
      return;
    }
    const formated = survey.questions?.map((question, index) => ({ ...question, answers: questions[index] }));
    // const answersFormated = answers.map((answer,index) => {
    //   return { title: survey[].title, answers: answer };
    // });
    console.log(formated);
    setFormatedQuestions(formated);
  }, [questions, survey]);
  return (
    <>
      <PageContainer>
        <Typography variant="h4">Respostas</Typography>

        <div className="respostas-container">
          {questions?.length > 0 ? (
            formatedQuestions?.map((question) =>
              question.type === QUESTION_TYPE.SINGLE_TEXTBOX ? (
                <AnswersList answers={question.answers} />
              ) : (
                <AnswersChart answers={question.answers} />
              )
            )
          ) : (
            <NoAnswserContainer>
              <SentimentVeryDissatisfiedIcon />
              <Typography variant="h4">Ainda não há nenhuma resposta</Typography>
            </NoAnswserContainer>
          )}
        </div>
      </PageContainer>
      {loading && <LoadingBar isLoadingFinished={loading} />}
    </>
  );
};

export default ViewAnswers;
