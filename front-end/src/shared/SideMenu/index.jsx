import React, { useContext } from 'react';
import { ThemeProvider, makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { fb } from '../../config/Fire';
import { AuthContext } from '../../context/AuthContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  toolbar: theme.mixins.toolbar,
}));

const SideMenu = () => {
  const history = useHistory();
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  const onLogout = () => {
    fb.auth().signOut();
  };

  return (
    <>
      {currentUser && (
        <>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                Lab-forms
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
              <ListItem button onClick={() => history.push('/visualizar-questionarios')}>
                <ListItemText>Visualizar Questionários</ListItemText>
              </ListItem>
              <ListItem button onClick={() => history.push('/criar-questionario')}>
                <ListItemText>Criar Questionário</ListItemText>
              </ListItem>
              <ListItem button onClick={() => onLogout()}>
                <ListItemText>Logout</ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </>
      )}
    </>
  );
};

export default SideMenu;
