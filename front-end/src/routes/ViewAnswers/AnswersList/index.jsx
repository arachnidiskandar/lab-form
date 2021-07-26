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

const AnswersListContainer = styled('div')({
  display: 'flex',
  '& ul': {
    flexBasis: (props) => (props.showMore ? '50%' : '100%'),
  },
});

const CheckboxContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  '& span': {
    alignSelf: 'center',
  },
});

const AnswersList = ({ question }) => {
  const [showMore, setShowMore] = useState(false);
  const [maxAnswersSize, setMaxAnswersSize] = useState(null);

  useEffect(() => {
    if (!question) {
      return;
    }
    const size = question.answers.length;
    if (size > 10) {
      setMaxAnswersSize(10);
    } else {
      setMaxAnswersSize(size);
    }
  }, [question]);

  const renderAnswer = (text) => (
    <ListItem>
      <ListItemText primary={text} />
    </ListItem>
  );

  const renderAnswersList = (answers) => {
    if (maxAnswersSize > 5) {
      return (
        <>
          <List>{answers.slice(0, 5).map((answer) => renderAnswer(answer.content))}</List>
          {showMore && (
            <List>{answers.slice(5, maxAnswersSize + 1).map((answer) => renderAnswer(answer.content))}</List>
          )}
        </>
      );
    }
    return <List>{answers.map((answer) => renderAnswer(answer.content))}</List>;
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{question?.title}</Typography>
        <Divider />
        {question && maxAnswersSize > 5 && (
          <CheckboxContainer>
            <span>Dez respostas</span>
            <Switch
              checked={showMore}
              onChange={() => setShowMore((prevState) => !prevState)}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </CheckboxContainer>
        )}
        <AnswersListContainer showMore={showMore}>
          {question && renderAnswersList(question.answers)}
        </AnswersListContainer>
      </CardContent>
    </Card>
  );
};

export default AnswersList;
