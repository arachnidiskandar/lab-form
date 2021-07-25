import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Button,
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Switch,
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import useFetch from '../../hooks/UseFetch';

import AnswersList from './AnswersList';

const PageContainer = styled(Container)({
  padding: '20px 0',
  '& .respostas-container': {
    marginTop: '5vh',
  },
  '& .MuiCard-root': {
    '& h5': {
      paddingBottom: '10px',
    },
  },
});

const mock = [
  {
    form: 'blabla',
    answers: {
      title: 'pergunta',
      content: ['aaaa', 'bbbbb', 'ccccc', 'ddddd', 'aaaa', 'bbbbb', 'ccccc', 'ddddd'],
    },
  },
];
const ViewAnswers = () => {
  const { pathname } = useLocation();
  const surveyId = pathname.split('/')[2];
  const [, survey] = useFetch(`/forms/${surveyId}`);
  const [loading, answers] = useFetch(`/forms/answers/${surveyId}`);
  const [questions, setQuestions] = useState([]);

  return (
    <PageContainer>
      <Typography variant="h4">Respostas</Typography>
      <div className="respostas-container">
        {mock.map((question) => (
          <AnswersList question={question.answers} />
        ))}
      </div>
    </PageContainer>
  );
};

export default ViewAnswers;
