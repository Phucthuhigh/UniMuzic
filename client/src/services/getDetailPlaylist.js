import * as httpRequest from "../utils/httpRequest";

export const getDetailPlaylist = async (id) => {
    try {
        const res = await httpRequest.get(`music/detailplaylist?id=${id}`);
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
