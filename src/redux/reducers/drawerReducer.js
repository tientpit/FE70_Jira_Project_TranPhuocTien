import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM,
  SET_SUBMIT_DRAWER_FUNCTION,
} from "../../redux/types/types";

const initialState = {
  visible: false,
  formContent: "",
  callBackSubmit: (props) => {
    alert("Submit");
  },
  title: "",
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };
    case CLOSE_DRAWER:
      return { ...state, visible: false };
    case OPEN_FORM:
      return {
        ...state,
        visible: true,
        formContent: action.Component,
        title: action.title,
      };
    case SET_SUBMIT_DRAWER_FUNCTION: {
      state.callBackSubmit = action.function;
      return { ...state };
    }
    default:
      return state;
  }
};
