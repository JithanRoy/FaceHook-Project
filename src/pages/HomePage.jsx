import React, {useEffect, useReducer} from 'react'
import {useAuth} from "../hooks/useAuth.js";
import {initialState, postReducer} from "../reducers/postReducer.js";
import useAxios from "../hooks/useAxios.js";
import PostList from "../components/posts/postList.jsx";
import {actions} from "../actions/index.js";

const HomePage = () => {
  const {auth} = useAuth();
  const [state, dispatch] = useReducer(postReducer, initialState);
  const {api} = useAxios();

  useEffect(() => {
    dispatch({type: actions.post.DATA_FETCHING})

    const fetchPost = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`);
        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    }

    fetchPost();
  }, []);

  if (state?.loading) {
    return <div> Fetching your Posts data...</div>
  }

  if (state?.error) {
    return <div> Error in fetching posts {state?.error?.message}</div>
  }

  return (
    <>
      <PostList posts={state?.posts}/>
    </>
  )
}

export default HomePage