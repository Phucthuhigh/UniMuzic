import * as httpRequest from "../utils/httpRequest";

export const getSong = async (id) => {
    try {
        const res = await httpRequest.get(`music/song?id=${id}`);
        return {
            success: true,
            items: res.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
