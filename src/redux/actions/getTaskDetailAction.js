import { taskServices } from "../../services/baseService";
import {
  DISPLAY_LOADING,
  GET_TASK_DETAIL,
  HIDE_LOADING,
} from "../../redux/types/types";

export const getTaskDetailAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: DISPLAY_LOADING });
    try {
      let { data } = await taskServices.getTaskDetail(id);
      console.log(data.content);
      dispatch({
        type: GET_TASK_DETAIL,
        value: data.content,
      });
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 100);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        dispatch({ type: HIDE_LOADING });
      }, 100);
    }
  };
};
