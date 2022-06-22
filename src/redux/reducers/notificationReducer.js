import { notification } from "antd";
import { SHOW_NOTIFICATION } from "../../redux/types/types";

const initialState = {
  message: "",
  description: " ",
  type: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      {
        state = action.value;
        notification[state.type]({
          message: state.message,
          description: state.description,
          // duration: 0,
        });
      }
      return { ...state };
    default:
      return state;
  }
};
