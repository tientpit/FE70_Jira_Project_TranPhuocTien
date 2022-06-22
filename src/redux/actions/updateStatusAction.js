import { taskServices } from "../../services/baseService";

export const updateStatusAction = (data, projectId) => {
  return async (dispatch) => {
    try {
      let result = await taskServices.updateStatus(data);
      console.log(result);
      // dispatch(getProjectDetailAction(projectId));
    } catch (error) {
      console.log(error);
    }
  };
};
