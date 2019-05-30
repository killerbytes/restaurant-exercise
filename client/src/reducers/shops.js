import {
  SELECT_DETAILS,
  FETCH_SHOPS,
  FETCH_SHOPS_FULFILLED,
  TOGGLE_SHOP,
  SET_MAP_TYPE
} from "../actions/types";

const initialState = {
  locate: null,
  details: { menu: [], location: {}, business_hours: {} },
  items: [],
  type: "ALL",
  fetching: false
};
export default function shop(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_TYPE: {
      return {
        ...state,
        type: action.payload,
        locate: null
      };
    }

    case SELECT_DETAILS: {
      return {
        ...state,
        details: action.payload
      };
    }
    case TOGGLE_SHOP: {
      return {
        ...state,
        locate: state.locate === action.payload ? null : action.payload
      };
    }
    case FETCH_SHOPS: {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_SHOPS_FULFILLED: {
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
