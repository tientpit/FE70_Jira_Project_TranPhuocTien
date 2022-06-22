import { taskServices } from "../../services/baseService";
import {
  CLOSE_DRAWER,
  DISPLAY_LOADING,
  HIDE_LOADING,
  SHOW_NOTIFICATION,
} from "../../redux/types/types";
import { getProjectDetailAction } from "./getProjectDetailAction";
import { NOTIFICATION_ICON } from "../../util/constant/configSystem";

export const createTaskAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      let result = await taskServices.createTask(data);
      console.log(result);
      setTimeout(() => {
        dispatch({ type: CLOSE_DRAWER });
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            type: NOTIFICATION_ICON.SUCCESS,
            description: "Create task successfully!",
          },
        });
        dispatch(getProjectDetailAction(data.projectId));
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch({ type: HIDE_LOADING });
    }
  };
};
