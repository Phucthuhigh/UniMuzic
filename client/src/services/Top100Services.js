import * as httpRequest from "../utils/httpRequest";

export const getTop100 = async () => {
    try {
        const res = await httpRequest.get("music/top100");
        return {
            success: true,
            items: res.data,
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
