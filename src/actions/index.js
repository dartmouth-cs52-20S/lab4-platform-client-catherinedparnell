import axios from 'axios';

// const ROOT_URL = 'https://cs52-lab5-cdp.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://platform.cs52.me/api';
// const API_KEY = '?key=c_parnell';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  FETCH_TAG: 'FETCH_TAG',
};

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        // dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
        console.log(error);
      });
  };
}

export function fetchPostsByTag(tag) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/filter/${tag}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_TAG, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function createPost(post, history) {
  axios.post(`${ROOT_URL}/posts`, post)
    .then(() => { history.push('/'); })
    .catch((error) => {
      console.log(error);
    });
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}/`, post)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}/`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`)
      .then(() => { history.push('/'); })
      .catch((error) => {
        console.log(error);
      });
  };
}
