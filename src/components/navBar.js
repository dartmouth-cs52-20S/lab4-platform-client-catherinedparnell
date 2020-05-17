// code for static, permanent left drawer from material-UI

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import {
  NavLink, Route, Switch, withRouter,
} from 'react-router-dom';
import Posts from './posts';
import NewPost from './newPost';
import FilterPosts from './filterPosts';
import Post from './post';
import SignIn from './signIn';
import SignUp from './signUp';
import { signoutUser } from '../actions';
import PrivateRoute from './privateRoute';

const drawerWidth = 240;

const useStyles = ((theme) => ({
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


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.onClickSignOut = this.onClickSignOut.bind(this);
  }

  onClickSignOut() {
    console.log('calling signout user action');
    this.props.signoutUser(this.props.history);
  }

  renderAuth() {
    if (this.props.authenticated) {
      return (
        <List>
          <ListItem button key="Meet" component={NavLink} to="/">
            <ListItemText primary="Meet" />
          </ListItem>
          <ListItem button key="Create" component={NavLink} to="/posts/new">
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem button key="Find" component={NavLink} to="/filter">
            <ListItemText primary="Find" />
          </ListItem>
          <ListItem button key="Sign Out" onClick={this.onClickSignOut}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      );
    } else {
      return (
        <List>
          <ListItem button key="Meet" component={NavLink} to="/">
            <ListItemText primary="Meet" />
          </ListItem>
          <ListItem button key="Create" component={NavLink} to="/posts/new">
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem button key="Find" component={NavLink} to="/filter">
            <ListItemText primary="Find" />
          </ListItem>
          <ListItem button key="Join" component={NavLink} to="/signup">
            <ListItemText primary="Join" />
          </ListItem>
          <ListItem button key="Sign In" component={NavLink} to="/signin">
            <ListItemText primary="Sign In" />
          </ListItem>
        </List>
      );
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              the SQUAD
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
          {this.renderAuth()}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Posts} />
            <PrivateRoute path="/posts/new" component={NewPost} />
            <Route path="/posts/:postID" component={Post} />
            <Route path="/filter/posts/:postID" component={Post} />
            <Route path="/filter/:tag" component={FilterPosts} />
            <Route path="/filter" component={FilterPosts} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route render={() => (<div>post not found </div>)} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, { signoutUser })(withStyles(useStyles)(NavBar)));
