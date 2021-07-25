import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import ViewSurveys from './routes/ViewSurveys';
import ViewAnswers from './routes/ViewAnswers';
import AnswerSurvey from './routes/AnswerSurvey';
import CreateSurvey from './routes/CreateSurvey';
import EditSurvey from './routes/EditSurvey';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Container>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/visualizar-questionarios" />
            </Route>
            <Route path="/criar-questionario" render={() => <CreateSurvey />} />
            <Route path="/responder-questionario/:id" render={() => <AnswerSurvey />} />
            <Route path="/visualizar-questionarios" render={() => <ViewSurveys />} />
            <Route path="/visualizar-respostas/:id" render={() => <ViewAnswers />} />
            <Route path="/editar-questionario/:id" render={() => <EditSurvey />} />
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
