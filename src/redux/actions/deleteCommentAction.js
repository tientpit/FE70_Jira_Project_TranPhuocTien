import { taskServices } from "../../services/baseService";
import { getAllCommentAction } from "./getAllCommentAction";

export const deleteCommentAction = (id, taskId) => {
  return async (dispatch) => {
    try {
      let result = await taskServices.deleteComment(id);
      console.log(result);
      dispatch(getAllCommentAction(taskId));
    } catch (error) {
      console.log(error);
    }
  };
};
