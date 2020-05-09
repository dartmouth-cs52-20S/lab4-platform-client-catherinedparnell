import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { fetchPosts } from '../actions';
import NewsCard from '../containers/newsCard';


class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <Grid container
        spacing={10}
        style={{ padding: '24px' }}
      >
        {this.props.allPosts.map((post) => (
          <Grid key={post.id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={3}
          >
            <Link to={`posts/${post.id}`}>
              <NewsCard title={post.title} coverurl={post.coverUrl} tags={post.tags} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => (
  {
    allPosts: state.posts.all || [],
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
