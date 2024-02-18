import http from "../httpService";

export function allEvents() {
  return http.get("/event/all");
}

export function createEvents(data: any) {
  return http.post("/event/add", data);
}

export function deleteEvent(id: any) {
  return http.delete(`/event/delete/${id}`);
}
