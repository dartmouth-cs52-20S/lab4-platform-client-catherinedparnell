import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { fetchPostsByTag } from '../actions';
import NewsCard from '../containers/newsCard';


class FilteredPosts extends Component {
  componentDidMount() {
    this.props.fetchPostsByTag(this.props.match.params.tag);
  }

  render() {
    return (
      <Grid container
        spacing={10}
        style={{ padding: '24px' }}
      >
        <Chip
          label={this.props.match.params.tag}
          id="chip-tag"
          color="primary"
        />
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
    );
  }
}

const mapStateToProps = (state) => (
  {
    filteredPosts: state.posts.filter || [],
  }
);

export default withRouter(connect(mapStateToProps, { fetchPostsByTag })(FilteredPosts));
