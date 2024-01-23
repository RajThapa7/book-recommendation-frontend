import { getToken } from "@/lib/getToken";
import axios from "axios";

export const _getUrl = (url: string) => {
  return 'http://localhost:4000' + url;
}

export const get_fetch = async (url: string) => await fetch(_getUrl(url), {
  method: "GET",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getToken()
  }
}).then((res) => res.json());


export async function postRequest(url: string, { arg }: { arg: any }) {
  return fetch(_getUrl(url), {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}