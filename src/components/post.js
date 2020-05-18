/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ChipArray from '../containers/chipArray';
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
      summary: '',
      is_editing: false,
    };
    this.onInputChangeTitle = this.onInputChangeTitle.bind(this);
    this.onInputChangeContent = this.onInputChangeContent.bind(this);
    this.onInputChangeTags = this.onInputChangeTags.bind(this);
    this.onInputChangeCoverURL = this.onInputChangeCoverURL.bind(this);
    this.onInputChangeSummary = this.onInputChangeSummary.bind(this);
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
    this.setState({ tags: event.target.value.split(' ') });
  }

  onInputChangeCoverURL(event) {
    this.setState({ coverUrl: event.target.value });
  }

  onInputChangeSummary(event) {
    this.setState({ summary: event.target.value });
  }

  editPost() {
    this.setState({
      title: this.props.currentPost.title,
      content: this.props.currentPost.content,
      tags: this.props.currentPost.tags,
      coverUrl: this.props.currentPost.coverUrl,
      summary: this.props.currentPost.summary,
      is_editing: true,
    });
  }

  updatePost() {
    const post = {
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags.join(' '),
      coverUrl: this.state.coverUrl,
      summary: this.state.summary,
    };
    this.props.updatePost(this.props.match.params.postID, post, this.props.history);
    this.setState({
      title: '',
      content: '',
      coverUrl: '',
      tags: '',
      summary: '',
      is_editing: false,
    });
    this.props.fetchPost(this.props.match.params.postID);
  }

  deletePost() {
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  // eslint-disable-next-line consistent-return
  renderButtons() {
    if (this.props.user) {
      if (this.props.user.email === this.props.currentPost.author.email) {
        console.log('i am rendering buttons');
        return (
          <div className="post-buttons">
            <CreateIcon className="icon" onClick={this.editPost} />
            <DeleteIcon className="icon" onClick={this.deletePost} />
          </div>
        );
      }
    }
  }

  render() {
    if (!this.props.currentPost.tags) return null;
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
            id="outlined-summary-input"
            label="Summary"
            defaultValue={this.state.summary}
            multiline
            rows={3}
            variant="outlined"
            onChange={this.onInputChangeSummary}
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
              defaultValue={this.state.tags.join(' ')}
              variant="outlined"
              onChange={this.onInputChangeTags}
            />
            <DoneIcon className="icon" onClick={this.updatePost} />
          </div>
        </div>
      );
    } else if (this.props.currentPost.tags[0] === '') {
      return (
        <div className="individual-post">
          <div id="post-buttons">
            <CreateIcon className="icon" onClick={this.editPost} />
            <DeleteIcon className="icon" onClick={this.deletePost} />
          </div>
          <div className="author">
            <div id="name">
              By: {this.props.currentPost.author.authorName}
            </div>
            <div id="username">
              @{this.props.currentPost.author.username}
            </div>
          </div>
          <div className="post-title">{this.props.currentPost.title}</div>
          <div className="container">
            <img id="post-img" src={this.props.currentPost.coverUrl} alt="alt-cover-url" />
            <div id="post-content" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content || '') }} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="individual-post">
          <div id="bar">
            <div className="author">
              <div id="name">
                By: {this.props.currentPost.author.authorName}
              </div>
              <div id="username">
                @{this.props.currentPost.author.username}
              </div>
            </div>
            {this.renderButtons()}
          </div>
          <div className="post-title">{this.props.currentPost.title}</div>
          <div id="tag-array">
            <ChipArray tags={this.props.currentPost.tags} />
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
    user: reduxState.auth.user,
  };
}

export default connect(mapStateToProps, {
  fetchPost, deletePost, updatePost,
})(Post);
