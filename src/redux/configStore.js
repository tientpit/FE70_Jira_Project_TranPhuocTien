import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import commentReducer from "./reducers/commentReducer";
import { drawerReducer } from "./reducers/drawerReducer";
import { editorContentReducer } from "./reducers/editorContentReducer";
import { formikReducer } from "./reducers/formikReducer";
import loadingReducer from "./reducers/loadingReducer";
import modalReducer from "./reducers/modalReducer";
import notificationReducer from "./reducers/notificationReducer";
import { projectReducer } from "./reducers/projectReducer";
import { taskReducer } from "./reducers/taskReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  //state
  userReducer,
  projectReducer,
  loadingReducer,
  notificationReducer,
  drawerReducer,
  editorContentReducer,
  taskReducer,
  modalReducer,
  commentReducer,
  formikReducer,
});

// const middleware = [thunk];
// const customCompose = composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(rootReducer, applyMiddleware(thunk));
