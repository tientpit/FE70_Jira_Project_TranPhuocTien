import { message } from "antd";
import { projectService } from "../../services/baseService";
import {
  SHOW_NOTIFICATION,
} from "../../redux/types/types";
import { getProjectAction } from "./getProjectAction";
import { NOTIFICATION_ICON } from "../../util/constant/configSystem";

export const removeUserFromProject = (value) => {
  return async (dispatch) => {
    try {
      let { data } = await projectService.removeUserFromProject(value);
      console.log(data.content);

      let description = data.content;
      dispatch({
        type: SHOW_NOTIFICATION,
        value: {
          type: NOTIFICATION_ICON.SUCCESS,
          description,
        },
      });
      dispatch(getProjectAction());
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      dispatch({
        type: SHOW_NOTIFICATION,
        value: {
          type: NOTIFICATION_ICON.ERROR,
          description: message,
        },
      });
    }
  };
};
