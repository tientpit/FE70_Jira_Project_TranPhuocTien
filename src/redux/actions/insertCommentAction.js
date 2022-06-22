import { taskServices } from "../../services/baseService";
import { getAllCommentAction } from "./getAllCommentAction";

export const insertCommentAction = (data) => {
  return async (dispatch) => {
    try {
      console.log(data);
      let result = await taskServices.insertComment(data);
      console.log(result);
      dispatch(getAllCommentAction(data.taskId));
    } catch (error) {
      console.log(error);
    }
  };
};
