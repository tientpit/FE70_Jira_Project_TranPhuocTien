import { GET_PROJECT_DETAIL } from "../../redux/types/types";
import { GET_CATEGORY, GET_PROJECT } from "../types/types";

const stateDefault = {
  projectArr: [],
  categoryArr: [],
  projectDetail: {},
};

export const projectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_PROJECT: {
      state.projectArr = action.value;
      return { ...state };
    }
    case GET_CATEGORY: {
      state.categoryArr = action.value;
      return { ...state };
    }
    case GET_PROJECT_DETAIL: {
      return { ...state, projectDetail: action.data };
    }
    case "REMOVE_PROJECT_DETAIL": {
      return { ...state, projectDetail: null };
    }
    default:
      return state;
  }
};
