import { taskServices } from "../../services/baseService";
import {
  CLOSE_MODAL,
  HIDE_LOADING,
  SHOW_NOTIFICATION,
} from "../../redux/types/types";
import { getProjectDetailAction } from "./getProjectDetailAction";
import { NOTIFICATION_ICON } from "../../util/constant/configSystem";

export const removeTaskAction = (id, projectId) => {
  return async (dispatch) => {
    try {
      let result = await taskServices.removeTask(id);
      console.log(result);
      dispatch(getProjectDetailAction(projectId));
      dispatch({ type: CLOSE_MODAL });
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            type: NOTIFICATION_ICON.SUCCESS,
            description: result.data.content,
          },
        });
      }, 500);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          value: {
            type: NOTIFICATION_ICON.ERROR,
            description: error.response.data.content,
          },
        });
      }, 500);
    }
  };
};
