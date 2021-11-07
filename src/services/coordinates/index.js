import axios from "axios";
import { config } from "../config";

export const getCoordinates = (vehiclesId, page = 1, size = 10, start = null, end = null) => {
    let date = (start && end) ? `&start=${start}&${end}=2021-11-06` : '';

    return axios.get(`${config.baseUrl}/coordinates?vehicleId=${vehiclesId}&page=${page}&size=${size}${date}`, {
        proxy: {
            host: `${config.proxy.host}`,
            port: config.proxy.port,
            protocol: 'http'
        }
    });
}

