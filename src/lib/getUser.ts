import { session } from "@/contants/token";
import { CookieValueTypes, getCookie } from "cookies-next";

export const getUser = () => {
  const user: CookieValueTypes = getCookie(session.user);
  if (user) {
    try {
      return JSON.parse(user);
    } catch {
      return {
        userId: 1,
      };
    }
  }
  return {
    userId: 1,
  };
};
