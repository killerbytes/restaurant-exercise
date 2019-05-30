import * as api from "../api";
import {
  TOGGLE_FAVORITE,
  TOGGLE_FAVORITE_FULFILLED,
  FETCH_FAVORITES,
  FETCH_FAVORITES_FULFILLED,
  UPDATE_FAVORITE,
  UPDATE_FAVORITE_FULFILLED
} from "./types";

export const toggleFavorite = item => dispatch => {
  dispatch({
    type: TOGGLE_FAVORITE
  });
  return api.setFavorite(item).then(res => {
    dispatch({
      type: TOGGLE_FAVORITE_FULFILLED,
      payload: res.data
    });
  });
};

export const updateFavorite = item => dispatch => {
  dispatch({
    type: UPDATE_FAVORITE
  });
  return api.updateFavorite(item).then(res => {
    dispatch({
      type: UPDATE_FAVORITE_FULFILLED,
      payload: res.data
    });
  });
};

export const getFavorites = item => dispatch => {
  dispatch({
    type: FETCH_FAVORITES
  });
  return api.fetchFavorites().then(res => {
    dispatch({
      type: FETCH_FAVORITES_FULFILLED,
      payload: res.data
    });
  });
};
