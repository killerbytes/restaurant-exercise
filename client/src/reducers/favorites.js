import {
  TOGGLE_FAVORITE,
  TOGGLE_FAVORITE_FULFILLED,
  FETCH_FAVORITES,
  FETCH_FAVORITES_FULFILLED,
  UPDATE_FAVORITE,
  UPDATE_FAVORITE_FULFILLED
} from "../actions/types";
const initialState = {
  items: [],
  fetching: false
};
export default function favorites(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      return {
        ...state,
        fetching: true
      };
    }
    case TOGGLE_FAVORITE_FULFILLED: {
      return {
        ...state,
        fetching: false,
        items: action.payload
      };
    }
    case UPDATE_FAVORITE: {
      return {
        ...state,
        fetching: true
      };
    }
    case UPDATE_FAVORITE_FULFILLED: {
      return {
        ...state,
        fetching: false,
        items: action.payload
      };
    }
    case FETCH_FAVORITES: {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_FAVORITES_FULFILLED: {
      return {
        ...state,
        fetching: false,
        items: action.payload
      };
    }

    default:
      return state;
  }
}
