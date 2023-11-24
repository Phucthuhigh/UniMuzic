import * as httpRequest from "../utils/httpRequest";

export const getSong = async (id) => {
    try {
        const dataSong = await httpRequest.get(`music/song?id=${id}`);
        const infoSong = await httpRequest.get(`music/infosong?id=${id}`);
        if (dataSong.err === 0 && infoSong.err === 0) {
            return {
                success: true,
                infoSong: infoSong.data,
                dataSong: dataSong.data,
            };
        } else {
            return {
                success: false,
                message: dataSong.msg,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
