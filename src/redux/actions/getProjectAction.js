import { projectService } from "../../services/baseService";
import {
  DISPLAY_LOADING,
  HIDE_LOADING
} from "../../redux/types/types";
import { GET_PROJECT } from "../types/types";

export const getProjectAction = (keyword) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISPLAY_LOADING,
      });
      //gọi api
      let { data, status } = await projectService.getProject(keyword);
      dispatch({
        type: GET_PROJECT,
        value: data.content,
      });
      setTimeout(() => {
        dispatch({
          type: HIDE_LOADING,
        });
      }, 100);
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: HIDE_LOADING,
    });
  };
};
