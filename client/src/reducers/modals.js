import { OPEN_MODAL, CLOSE_MODAL } from "../actions/types";
const initialState = {
  views: []
};
export default function modals(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        views: state.views.concat(action.payload)
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        views: state.views.filter(item => item !== action.payload)
      };
    }
    default:
      return state;
  }
}
