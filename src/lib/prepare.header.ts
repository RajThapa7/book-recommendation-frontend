import { getAdminToken, getToken } from "./getToken";

export const prepareProtectedHeader = (headers: Headers) => {
  const token = getToken();
  if (token) {
    headers.set("Authorization", "Bearer " + token);
  }
  return;
}
export const prepareAdminProtectedHeader = (headers: Headers) => {
  const token = getAdminToken();
  if (token) {
    headers.set("Authorization", "Bearer " + token);
  }
  return;
}