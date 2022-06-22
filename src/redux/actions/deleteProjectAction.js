import { projectService } from "../../services/baseService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  SHOW_NOTIFICATION,
} from "../../redux/types/types";
import { getProjectAction } from "./getProjectAction";
import { NOTIFICATION_ICON } from "../../util/constant/configSystem";

export const deleteProjectAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      //gọi api deleteProject
      let result = await projectService.deleteProject(id);
      console.log(result);

      //load lại project
      dispatch(getProjectAction());

      //ẩn loading sreen
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 500);
      dispatch({
        type: SHOW_NOTIFICATION,
        value: {
          type: NOTIFICATION_ICON.SUCCESS,
          description: "Deleted project successfully !",
        },
      });
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 500);
    }
  };
};
