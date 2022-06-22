import { http } from "../util/config";

export default class taskServices {
  getTaskStatus() {
    return http.get("api/Status/getAll");
  }

  getTaskType() {
    return http.get("api/TaskType/getAll");
  }

  getPriority() {
    return http.get("api/Priority/getAll");
  }

  createTask(data) {
    return http.post("api/Project/createTask", data);
  }

  getTaskDetail(id) {
    return http.get(`api/Project/getTaskDetail?taskId=${id}`);
  }

  updateTask(data) {
    return http.post("api/Project/updateTask", data);
  }

  insertComment(data) {
    return http.post("api/Comment/insertComment", data);
  }

  getAllComment(id) {
    return http.get(`api/Comment/getAll?taskId=${id}`);
  }

  deleteComment(id) {
    return http.delete(`api/Comment/deleteComment?idComment=${id}`);
  }

  removeTask(id) {
    return http.delete(`api/Project/removeTask?taskId=${id}`);
  }

  updateStatus(data) {
    return http.put("api/Project/updateStatus", data);
  }
}
