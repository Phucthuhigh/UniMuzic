import axios from "axios";
import { BASE_URL } from "./constants";

const request = axios.create({
    baseURL: BASE_URL,
});

export const get = async (path, options = {}) => {
    const res = await request.get(path, options);

    return res.data;
};

export const post = async (path, options = {}) => {
    const res = await request.post(path, options);

    return res.data;
};

export default request;
