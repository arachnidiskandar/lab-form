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

const AnswersList = ({ answers }) => {
  const [showMore, setShowMore] = useState(false);
  const [maxAnswersSize, setMaxAnswersSize] = useState(null);

  useEffect(() => {
    if (!answers) {
      return;
    }
    const size = answers.length;
    if (size > 10) {
      setMaxAnswersSize(10);
    } else {
      setMaxAnswersSize(size);
    }
  }, [answers]);

  const renderAnswer = (text) => (
    <ListItem>
      <ListItemText primary={text} />
    </ListItem>
  );

  const renderAnswersList = (answersList) => {
    if (maxAnswersSize > 5) {
      return (
        <>
          <List>{answersList.slice(0, 5).map((answer) => renderAnswer(answer.content))}</List>
          {showMore && (
            <List>{answersList.slice(5, maxAnswersSize + 1).map((answer) => renderAnswer(answer.content))}</List>
          )}
        </>
      );
    }
    return <List>{answers.map((answer) => renderAnswer(answer.content))}</List>;
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{answers?.title}</Typography>
        <Divider />
        {answers && maxAnswersSize > 5 && (
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
        <AnswersListContainer showMore={showMore}>{answers && renderAnswersList(answers)}</AnswersListContainer>
      </CardContent>
    </Card>
  );
};

export default AnswersList;
