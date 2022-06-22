import { userServices } from "../../services/baseService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  SHOW_NOTIFICATION,
} from "../../redux/types/types";
import { getAllUserAction } from "./getAllUserAction";
import { NOTIFICATION_ICON } from "../../util/constant/configSystem";

export const deleteUserAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      let { data } = await userServices.deleteUser(id);
      console.log(data);
      dispatch(getAllUserAction());
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            type: NOTIFICATION_ICON.SUCCESS,
            description: data.message,
          },
        });
      }, 300);
    } catch (error) {
      console.log(error);
      dispatch(getAllUserAction());
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            type: NOTIFICATION_ICON.ERROR,
            description: error.response.data.content,
          },
        });
      }, 300);
    }
  };
};
