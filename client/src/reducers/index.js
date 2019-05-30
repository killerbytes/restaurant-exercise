import { combineReducers } from "redux";

import shops from "./shops";
import favorites from "./favorites";
import modals from "./modals";

export default combineReducers({
  shops,
  favorites,
  modals
});
