import http from "../httpService";

export function lastPoster() {
  return http.get("/poster/last");
}

export function addPoster(data: any) {
  return http.post("/poster/add", data);
}
