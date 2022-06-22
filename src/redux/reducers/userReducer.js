import {
  GET_ALL_USER,
  GET_USER_DETAIL,
  USER_LOGIN
} from "../../redux/types/types";
import { LOGIN, REGISTER } from "../types/types";

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  userSearch: [],
  regisResult: false,
  userDetail: {},
};

export const userReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN: {
      state.userLogin = action.value;
      return { ...state };
    }
    case GET_ALL_USER:
      return { ...state, userSearch: action.value };
    case REGISTER: {
      return { ...state, regisResult: action.value };
    }
    case GET_USER_DETAIL:
      return { ...state, userDetail: action.value };
    default:
      return state;
  }
};
