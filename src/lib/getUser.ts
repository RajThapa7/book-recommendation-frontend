import { session } from "@/contants/token";
import { getCookie } from "cookies-next";

export const getUser = () => {
    const user: string | null | undefined = getCookie(session.user);
    return JSON.parse(user!);
};
