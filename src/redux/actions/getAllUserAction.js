import { userServices } from "../../services/baseService";
import {
  DISPLAY_LOADING,
  GET_ALL_USER,
  GET_USER_DETAIL,
  HIDE_LOADING,
} from "../../redux/types/types";
export const getAllUserAction = (keyword, quantity) => {
  return async (dispatch) => {
    // dispatch({ type: DISPLAY_LOADING });
    try {
      let result = await userServices.getAllUser(keyword ? keyword : "");
      console.log(result);
      switch (quantity) {
        case "one":
          {
            dispatch({
              type: GET_USER_DETAIL,
              value: result.data.content[0],
            });
          }
          break;
        default:
          {
            dispatch({
              type: GET_ALL_USER,
              value: result.data.content,
            });
          }
          break;
      }
      // setTimeout(() => {
      //   dispatch({ type: HIDE_LOADING });
      // }, 100);
    } catch (error) {
      console.log(error);
    }
  };
};
