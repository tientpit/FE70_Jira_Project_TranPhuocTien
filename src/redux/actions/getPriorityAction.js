import { taskServices } from "../../services/baseService";
import { GET_PRIORITY } from "../../redux/types/types";

export const getPriorityAction = () => {
  return async (dispatch) => {
    try {
      let { data } = await taskServices.getPriority();
      dispatch({ type: GET_PRIORITY, value: data.content });
    } catch (error) {
      console.log(error);
    }
  };
};
