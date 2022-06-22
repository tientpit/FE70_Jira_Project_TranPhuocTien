import { userServices } from "../../services/baseService";
import {
  SHOW_NOTIFICATION,
} from "../../redux/types/types";
import { NOTIFICATION_ICON } from "../../util/constant/configSystem";

export const registerAction = (data, resetForm) => {
  return async (dispatch) => {
    try {
      let result = await userServices.register(data);
      console.log(result);
      dispatch({
        type: SHOW_NOTIFICATION,
        value: {
          description: "Register successfully",
          type: NOTIFICATION_ICON.SUCCESS,
        },
      });
      resetForm();
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
      console.log(error);
      dispatch({
        type: SHOW_NOTIFICATION,
        value: {
          description: "Email is already used",
          type: NOTIFICATION_ICON.ERROR,
        },
      });
    }
  };
};
