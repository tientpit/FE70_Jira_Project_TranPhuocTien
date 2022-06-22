import { GET_ALL_COMMENT } from "../../redux/types/types";

const initialState = {
  lstComment: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENT:
      return { ...state, lstComment: action.data };

    default:
      return state;
  }
};
