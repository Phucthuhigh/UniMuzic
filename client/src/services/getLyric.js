import * as httpRequest from "../utils/httpRequest";

const getLyric = async (id) => {
    try {
        const data = await httpRequest.get("music/lyric", {
            params: {
                id: id,
            },
        });
        return {
            success: true,
            items: data,
        };
    } catch (err) {
        return {
            success: false,
            message: err.message,
        };
    }
};

export { getLyric };
