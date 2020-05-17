import React, { Component } from 'react';
import { connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      authorName: '',
    };
    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
    this.onInputChangeUsername = this.onInputChangeUsername.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
    this.onInputChangeAuthorName = this.onInputChangeAuthorName.bind(this);
    this.onClickSignUp = this.onClickSignUp.bind(this);
  }

  onInputChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onInputChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onInputChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onInputChangeAuthorName(event) {
    this.setState({ authorName: event.target.value });
  }

  onClickSignUp() {
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      authorName: this.state.authorName,
    };
    console.log('calling signup user action');
    this.props.signupUser(user, this.props.history);
  }

  render() {
    return (
      <div className="individual-post-editing" id="sign-up">
        <div className="post-title">Sign Up</div>
        <TextField
          id="outlined-name-input"
          label="Name"
          defaultValue={this.state.authorName}
          variant="outlined"
          onChange={this.onInputChangeAuthorName}
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          defaultValue={this.state.email}
          variant="outlined"
          onChange={this.onInputChangeEmail}
        />
        <TextField
          id="outlined-username-input"
          label="Username"
          defaultValue={this.state.username}
          variant="outlined"
          onChange={this.onInputChangeUsername}
        />
        <div className="container">
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            defaultValue={this.state.password}
            variant="outlined"
            onChange={this.onInputChangePassword}
          />
          <DoneIcon className="icon" onClick={this.onClickSignUp} />
        </div>
      </div>
    );
  }
}

export default connect(null, { signupUser })(SignUp);
