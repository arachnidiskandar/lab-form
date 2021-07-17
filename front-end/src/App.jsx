import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ViewSurveys from './routes/ViewSurveys';
import AnswerSurvey from './routes/AnswerSurvey';
import CreateForm from './routes/CreateForm';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Container>
        <Router>
          <Switch>
            <Route path="/criar-questionario" render={() => <CreateForm />} />
            <Route path="/responder-questionario" render={() => <AnswerSurvey />} />
            <Route path="/visualizar-questionarios" render={() => <ViewSurveys />} />
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
