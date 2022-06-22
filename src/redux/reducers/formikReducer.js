import { SET_RESET_FORM_FUNCTION } from "../../redux/types/types";

const initialState = {
  resetForm: () => {},
};

export const formikReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESET_FORM_FUNCTION:
      return { ...state, resetForm: action.function };

    default:
      return state;
  }
};
