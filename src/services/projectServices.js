import { http } from "../util/config";

export default class ProjectServices {
  getProject(keyword) {
    return keyword
      ? http.get(`api/Project/getAllProject?keyword=${keyword}`)
      : http.get("api/Project/getAllProject");
  }

  getProjectDetail(id) {
    return http.get(`api/Project/getProjectDetail?id=${id}`);
  }

  getProjectCategory() {
    return http.get("api/ProjectCategory");
  }

  updateProject(data) {
    return http.put(`api/Project/updateProject?projectId=${data.id}`, data);
  }

  deleteProject(id) {
    return http.delete(`api/Project/deleteProject?projectId=${id}`);
  }

  createProject(data) {
    return http.post(`api/Project/createProject`, data);
  }

  createProjectAuthorize(data) {
    return http.post(`api/Project/createProjectAuthorize`, data);
  }

  assignUserProject(data) {
    return http.post("api/Project/assignUserProject", data);
  }

  removeUserFromProject(data) {
    return http.post("api/Project/removeUserFromProject", data);
  }
}
