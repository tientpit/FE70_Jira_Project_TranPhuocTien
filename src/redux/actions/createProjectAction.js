import { projectService } from "../../services/baseService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  SHOW_NOTIFICATION,
} from "../../redux/types/types";
import { NOTIFICATION_ICON } from "../../util/constant/configSystem";

export const createProjectAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      const result = await projectService.createProjectAuthorize(data);
      console.log(result);

      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 500);

      dispatch({
        type: SHOW_NOTIFICATION,
        value: {
          type: NOTIFICATION_ICON.SUCCESS,
          description: "Create project successfully !",
        },
      });
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 500);

      const { content } = error.response.data;
      dispatch({
        type: SHOW_NOTIFICATION,
        value: {
          type: NOTIFICATION_ICON.ERROR,
          description: content,
        },
      });
    }
  };
};
