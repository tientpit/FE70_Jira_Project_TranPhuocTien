import { http } from "../util/config";

export default class UserServices {
  login(data) {
    return http.post("api/Users/signin", data);
  }

  register(data) {
    return http.post("api/Users/signup", data);
  }

  checkLogin = () => {
    return http.post("api/Users/TestToken");
  };

  getAllUser = (keyword) => {
    return http.get(`api/Users/getUser?keyword=${keyword}`);
  };

  editUser = (data) => {
    return http.put("api/Users/editUser", data);
  };

  deleteUser = (id) => {
    return http.delete(`api/Users/deleteUser?id=${id}`);
  };
}
