import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { fetchTags, fetchPostsByTag, fetchPosts } from '../actions';
import ChipArray from '../containers/chipArray';
import NewsCard from '../containers/newsCard';


class FilterPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchTags();
    if (this.props.match.params.tag) {
      this.props.fetchPostsByTag(this.props.match.params.tag);
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.tag !== prevProps.match.params.tag) {
      this.props.fetchPostsByTag(this.props.match.params.tag);
    }
  }

  render() {
    let arr = [];
    let p;
    for (p of this.props.allTags) {
      arr = arr.concat(p.tags);
    }
    if (!this.props.match.params.tag) {
      return (
        <div>
          <ChipArray tags={[...new Set(arr)]} />
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
                <Link to={`posts/${post.id}`} style={{ textDecoration: 'none' }}>
                  <NewsCard
                    title={post.title}
                    coverurl={post.coverUrl}
                    date={post.createdAt.substr(0, post.createdAt.indexOf('T'))}
                    summary={post.summary}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <ChipArray tags={[...new Set(arr)]} selected={this.props.match.params.tag} />
          <Grid container
            spacing={10}
            style={{ padding: '24px' }}
          >
            {this.props.filteredPosts.map((post) => (
              <Grid key={post.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
              >
                <Link to={`posts/${post.id}`} style={{ textDecoration: 'none' }}>
                  <NewsCard
                    title={post.title}
                    coverurl={post.coverUrl}
                    date={post.createdAt.substr(0, post.createdAt.indexOf('T'))}
                    summary={post.summary}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => (
  {
    allPosts: state.posts.all || [],
    allTags: state.posts.allTags || [],
    filteredPosts: state.posts.filter || [],
  }
);

export default withRouter(connect(mapStateToProps, { fetchTags, fetchPostsByTag, fetchPosts })(FilterPosts));
