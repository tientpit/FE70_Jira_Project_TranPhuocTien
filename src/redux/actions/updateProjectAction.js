import { projectService } from "../../services/baseService";
import {
  CLOSE_DRAWER,
  DISPLAY_LOADING,
  HIDE_LOADING,
  SHOW_NOTIFICATION,
} from "../../redux/types/types";
import { getProjectAction } from "./getProjectAction";
import { NOTIFICATION_ICON } from "../../util/constant/configSystem";

export const updateProjectAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      let result = await projectService.updateProject(data);
      console.log(result);

      dispatch(getProjectAction());
      dispatch({ type: CLOSE_DRAWER });

      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 500);

      dispatch({
        type: SHOW_NOTIFICATION,
        value: { description: "Edited !", type: NOTIFICATION_ICON.SUCCESS },
      });
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 500);
    }
  };
};
