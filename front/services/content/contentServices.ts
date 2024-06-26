import http from "../httpService";

export function allContent(slug: string, year: number) {
  const params = new URLSearchParams();

  if (slug) {
    params.append("slug", slug);
  }

  if (year) {
    params.append("year", year.toString());
  }

  const url = `/content/all${params.toString() ? `?${params.toString()}` : ""}`;

  return http.get(url);
}

export function deleteContentImage({ contentId, imageId }) {
  return http.delete(`/content/deleteImage/${contentId}/${imageId}`);
}

export function deleteContentFile({ contentId, fileId }) {
  return http.delete(`/content/deleteFile/${contentId}/${fileId}`);
}

export function allContentAdmin(page: number, limit: number) {
  return http.get(`/content/allcontentadmin${page && `?page=${page}&`}${limit && `limit=${limit}`}`);
}

export function contentById(id: string) {
  return http.get(`/content/${id}`);
}

export function checkHoliday() {
  return http.get(`/holiday/holiday`);
}

export function createContent(data: any) {
  return http.post(`/content/add`, data);
}

export function updateContentById(id: any, data: any) {
  return http.put(`/content/update/${id}`, data);
}

export function deleteContent(id: string) {
  return http.delete(`/content/delete/${id}`);
}

export function allCount() {
  return http.get(`/content/allcount`);
}

export function contentOfMonth() {
  return http.get(`/content/contentofmonth`);
}

export function contentuser() {
  return http.get(`/content/contentuser`);
}

export function changeShowContent(id: string) {
  return http.put(`/content/show/${id}`);
}
