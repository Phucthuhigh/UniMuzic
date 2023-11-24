import * as httpRequest from "../utils/httpRequest";

export const getDetailArtist = async (name) => {
    try {
        const res = await httpRequest.get(`music/artist?name=${name}`);
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
