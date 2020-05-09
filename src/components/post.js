/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import {
  fetchPost, deletePost, updatePost,
} from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      coverUrl: '',
      is_editing: false,
    };
    this.onInputChangeTitle = this.onInputChangeTitle.bind(this);
    this.onInputChangeContent = this.onInputChangeContent.bind(this);
    this.onInputChangeTags = this.onInputChangeTags.bind(this);
    this.onInputChangeCoverURL = this.onInputChangeCoverURL.bind(this);
    this.editPost = this.editPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
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

  editPost() {
    this.setState({
      title: this.props.currentPost.title,
      content: this.props.currentPost.content,
      tags: this.props.currentPost.tags,
      coverUrl: this.props.currentPost.coverUrl,
      is_editing: true,
    });
  }

  updatePost() {
    const post = {
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags,
      coverUrl: this.state.coverUrl,
    };
    this.props.updatePost(this.props.match.params.postID, post);
    this.setState({
      title: '',
      content: '',
      coverUrl: '',
      tags: '',
      is_editing: false,
    });
    this.props.fetchPost(this.props.match.params.postID);
  }

  deletePost() {
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  render() {
    if (this.state.is_editing) {
      return (
        <div className="individual-post-editing" id="editing-post">
          <TextField
            className="input"
            id="outlined-title-input"
            label="Title"
            defaultValue={this.state.title}
            variant="outlined"
            onChange={this.onInputChangeTitle}
          />
          <TextField
            className="input"
            id="outlined-url-input"
            label="Cover URL"
            defaultValue={this.state.coverUrl}
            variant="outlined"
            onChange={this.onInputChangeCoverURL}
          />
          <TextField
            className="input"
            id="outlined-content-input"
            label="Content"
            defaultValue={this.state.content}
            multiline
            rows={6}
            variant="outlined"
            onChange={this.onInputChangeContent}
          />
          <div className="container">
            <TextField
              className="input"
              id="outlined-tag-input"
              label="Tags"
              defaultValue={this.state.tags}
              variant="outlined"
              onChange={this.onInputChangeTags}
            />
            <DoneIcon onClick={this.updatePost} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="individual-post">
          <div className="post-title">{this.props.currentPost.title}</div>
          <div id="post-bar">
            <Chip label={this.props.currentPost.tags} color="primary" />
            <div id="post-buttons">
              <CreateIcon onClick={this.editPost} />
              <DeleteIcon onClick={this.deletePost} />
            </div>
          </div>
          <div className="container">
            <img id="post-img" src={this.props.currentPost.coverUrl} alt="alt-cover-url" />
            <div id="post-content" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content || '') }} />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

export default connect(mapStateToProps, {
  fetchPost, deletePost, updatePost,
})(Post);
