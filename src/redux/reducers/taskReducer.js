import {
  GET_PRIORITY,
  GET_TASK_DETAIL,
  GET_TASK_STATUS,
  GET_TASK_TYPE,
} from "../../redux/types/types";

const initialState = {
  taskStatus: [],
  taskType: [],
  priority: [],
  taskDetail: {},
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_STATUS:
      return { ...state, taskStatus: action.value };
    case GET_TASK_TYPE:
      return { ...state, taskType: action.value };
    case GET_PRIORITY:
      return { ...state, priority: action.value };
    case GET_TASK_DETAIL:
      return { ...state, taskDetail: action.value };
    default:
      return state;
  }
};
