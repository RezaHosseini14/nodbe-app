import http from "../httpService";

export function allUser(page: number, limit: number) {
  return http.get(`/user/all${page && `?page=${page}&`}${limit && `limit=${limit}`}`);
}

export function addUser(data: any) {
  return http.post("/auth/register", data);
}

export function addUserFull(data: any) {
  return http.post("/auth/registerfull", data);
}

export function deleteUser(id: string) {
  return http.delete(`/user/delete/${id}`);
}

export function blockUser(id: string) {
  return http.get(`/user/block/${id}`);
}

export function getUser(id: string) {
  return http.get(`/user/${id}`);
}

export function updateUser(id: any, data: any) {
  return http.put(`/user/update/${id}`, data);
}

export function bestUser() {
  return http.get(`/user/bestuser`);
}

export function allAuditLogs(page: number, limit: number) {
  return http.get(`/auditlog/all${page && `?page=${page}&`}${limit && `limit=${limit}`}`);
}
