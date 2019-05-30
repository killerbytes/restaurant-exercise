import { OPEN_MODAL, CLOSE_MODAL } from "./types";

export const openModal = modals => dispatch => {
  dispatch({
    type: OPEN_MODAL,
    payload: modals
  });
};

export const closeModal = modals => dispatch => {
  dispatch({
    type: CLOSE_MODAL,
    payload: modals
  });
};
