/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      coverUrl: '',
    };
    this.onInputChangeTitle = this.onInputChangeTitle.bind(this);
    this.onInputChangeContent = this.onInputChangeContent.bind(this);
    this.onInputChangeTags = this.onInputChangeTags.bind(this);
    this.onInputChangeCoverURL = this.onInputChangeCoverURL.bind(this);
    this.onClickNewPost = this.onClickNewPost.bind(this);
  }

  onInputChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  onInputChangeContent(event) {
    this.setState({ content: event.target.value });
  }

  onInputChangeTags(event) {
    this.setState({ tags: event.target.value });
  }

  onInputChangeCoverURL(event) {
    this.setState({ coverUrl: event.target.value });
  }

  onClickNewPost() {
    const post = {
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags,
      coverUrl: this.state.coverUrl,
    };
    createPost(post, this.props.history);
  }

  render() {
    return (
      <div className="individual-post-editing" id="new-post">
        <div className="container">
          <TextField
            id="outlined-title-input"
            label="Title"
            defaultValue={this.state.title}
            variant="outlined"
            onChange={this.onInputChangeTitle}
          />
          <i className="fas fa-check" onClick={this.onClickNewPost} />
        </div>
        <TextField
          id="outlined-url-input"
          label="Cover URL"
          defaultValue={this.state.coverUrl}
          variant="outlined"
          onChange={this.onInputChangeCoverURL}
        />
        <TextField
          id="outlined-content-input"
          label="Content"
          defaultValue={this.state.content}
          multiline
          rows={6}
          variant="outlined"
          onChange={this.onInputChangeContent}
        />
        <TextField
          id="outlined-tag-input"
          label="Tags"
          defaultValue={this.state.tags}
          variant="outlined"
          onChange={this.onInputChangeTags}
        />
      </div>
    );
  }
}

export default connect(null, { createPost })(NewPost);
