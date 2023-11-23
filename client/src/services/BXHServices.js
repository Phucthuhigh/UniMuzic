import * as httpRequest from "../utils/httpRequest";

export const getBXH = async () => {
    try {
        const res = await httpRequest.get("music/charthome");
        return {
            success: true,
            items: res.data,
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
