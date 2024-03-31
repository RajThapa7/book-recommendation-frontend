import { session } from "@/contants/token";
import { getCookie } from "cookies-next";

export const getToken = () => {
  const token: string | null | undefined = getCookie(session.token);
  return token;
};
export const getAdminToken = () => {
  const token: string | null | undefined = getCookie('adminToken');
  return token;
};
