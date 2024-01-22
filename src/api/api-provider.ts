import axios from "axios";

const _getUrl = (url: string) => {
  return 'http://localhost:4000' + url;
}

export const get_fetch = async (url: string) => await axios.get(_getUrl(url), {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
}).then(res => res.data);

export const post_fetch = async (url: string, data: any) => await axios.post(_getUrl(url), {
  data: data 
}).then(res => res.data);
