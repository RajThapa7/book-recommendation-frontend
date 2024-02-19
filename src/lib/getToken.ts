import { session } from "@/contants/token";
import { getCookie } from "cookies-next";

export const getToken = () => {
  const token: string | null | undefined = getCookie(session.token);
  return token;
};
