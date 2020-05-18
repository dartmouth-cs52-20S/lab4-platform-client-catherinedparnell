import React, { Component } from 'react';
import { connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
    this.onClickSignIn = this.onClickSignIn.bind(this);
  }

  onInputChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onInputChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onClickSignIn() {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signinUser(user, this.props.history);
  }

  render() {
    return (
      <div className="individual-post-editing" id="sign-up">
        <div className="post-title">Sign In</div>
        <TextField
          id="outlined-email-input"
          label="Email"
          defaultValue={this.state.email}
          variant="outlined"
          onChange={this.onInputChangeEmail}
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
          <DoneIcon className="icon" onClick={this.onClickSignIn} />
        </div>
      </div>
    );
  }
}

export default connect(null, { signinUser })(SignIn);
