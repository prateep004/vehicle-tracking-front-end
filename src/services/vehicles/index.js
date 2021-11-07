import axios from "axios";
import { config } from "../config";

export const getVahicles = (page = 1, size = 10) => {
    return axios.get(`${config.baseUrl}/vehicles?page=${page}&size=${size}`, {
        proxy: {
            host: `${config.proxy.host}`,
            port: config.proxy.port,
            protocol: 'http'
        }
    });
}

