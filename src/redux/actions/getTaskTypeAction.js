import { taskServices } from "../../services/baseService";
import { GET_TASK_TYPE } from "../../redux/types/types";

export const getTaskTypeAction = () => {
  return async (dispatch) => {
    try {
      let { data } = await taskServices.getTaskType();
      dispatch({ type: GET_TASK_TYPE, value: data.content });
    } catch (error) {
      console.log(error);
    }
  };
};
