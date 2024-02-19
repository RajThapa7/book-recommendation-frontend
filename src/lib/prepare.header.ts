import { getToken } from "./getToken";

export const prepareProtectedHeader = (headers: Headers) => {
  const token = getToken();
  if (token) {
    headers.set("Authorization", "Bearer " + token);
  }
  return;
}