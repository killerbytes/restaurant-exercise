import { fetchShops } from "../api";
import {
  FETCH_SHOPS,
  FETCH_SHOPS_FULFILLED,
  SELECT_DETAILS,
  TOGGLE_SHOP,
  SET_MAP_TYPE
} from "./types";

export const showDetails = item => dispatch => {
  dispatch({
    type: SELECT_DETAILS,
    payload: item
  });
};

export const setMapType = type => dispatch => {
  dispatch({
    type: SET_MAP_TYPE,
    payload: type
  });
};

export const toggleShop = item => dispatch => {
  dispatch({
    type: TOGGLE_SHOP,
    payload: item
  });
};

export const getShops = () => dispatch => {
  dispatch({
    type: FETCH_SHOPS
  });
  return fetchShops().then(res => {
    dispatch({
      type: FETCH_SHOPS_FULFILLED,
      payload: res.data
    });
  });
};
