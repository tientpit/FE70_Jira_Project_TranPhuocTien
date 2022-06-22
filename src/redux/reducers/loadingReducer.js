import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../redux/types/types";

const initialState = {
  loadingStatus: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING:
      state.loadingStatus = true;
      return { ...state };

    case HIDE_LOADING:
      state.loadingStatus = false;
      return { ...state };

    default:
      return state;
  }
};
