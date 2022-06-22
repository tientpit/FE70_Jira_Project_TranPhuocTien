import { taskServices } from "../../services/baseService";
import { GET_TASK_STATUS } from "../../redux/types/types";

export const getTaskStatusAction = () => {
  return async (dispatch) => {
    try {
      let { data } = await taskServices.getTaskStatus();
      dispatch({ type: GET_TASK_STATUS, value: data.content });
    } catch (error) {
      console.log(error);
    }
  };
};
