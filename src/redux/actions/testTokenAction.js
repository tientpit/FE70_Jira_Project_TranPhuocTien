import { userServices } from "../../services/baseService";
import { STATUS_CODE } from "../../util/constant/configSystem";

export const testTokenAction = (props, login) => {
  return async (dispatch) => {
    try {
      let result = await userServices.checkLogin();
      console.log(result);
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode === STATUS_CODE.SERVER_ERROR) {
        return login ? props.push("/") : null;
      } else {
        props.push("/login");
      }
    }
  };
};
