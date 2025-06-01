import {actions} from "../actions/index.js";


export const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
}

export const ProfileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
      }
    }

    case actions.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        error: action.error,
      }
    }

    case actions.profile.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }

    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.avatar,
        },
      };
    }

    default: {
      return state;
    }
  }
}

