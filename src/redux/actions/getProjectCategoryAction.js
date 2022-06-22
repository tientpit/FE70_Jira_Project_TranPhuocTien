import { projectService } from "../../services/baseService";
import { GET_CATEGORY } from "../types/types";

export const getProjectCategoryAction = () => {
  return async (dispatch) => {
    try {
      let { data } = await projectService.getProjectCategory();
      const action = {
        type: GET_CATEGORY,
        value: data.content,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
