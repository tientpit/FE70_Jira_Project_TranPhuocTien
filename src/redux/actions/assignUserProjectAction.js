import { projectService } from "../../services/baseService";
import {
  SHOW_NOTIFICATION
} from "../../redux/types/types";
import { getProjectAction } from "./getProjectAction";
import { NOTIFICATION_ICON } from "../../util/constant/configSystem";

export const assignUserProjectAction = (value) => {
  return async (dispatch) => {
    console.log(value.valueDispatch);
    try {
      let { data } = await projectService.assignUserProject(value);
      console.log(data);
      let message = data.content;
      dispatch({
        type: SHOW_NOTIFICATION,
        value: { description: message, type: NOTIFICATION_ICON.SUCCESS },
      });
      dispatch(getProjectAction());
    } catch (error) {
      console.log(error);
      let description = error.response.data.content;
      dispatch({
        type: SHOW_NOTIFICATION,
        value: { description, type: NOTIFICATION_ICON.ERROR },
      });
    }
  };
};
