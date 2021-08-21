import React from 'react';
import { ThemeProvider, makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import ViewSurveys from './routes/ViewSurveys';
import ViewAnswers from './routes/ViewAnswers';
import AnswerSurvey from './routes/AnswerSurvey';
import CreateSurvey from './routes/CreateSurvey';
import EditSurvey from './routes/EditSurvey';
import SideMenu from './shared/SideMenu';
import Login from './routes/Login';
import CreateAccount from './routes/CreateAccount';
import { AuthProvider } from './context/AuthContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <SideMenu />
            <Container className={classes.content}>
              <div className={classes.toolbar} />
              <Route path="/login" render={() => <Login />} />
              <Route path="/criar-conta" render={() => <CreateAccount />} />
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
            </Container>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
