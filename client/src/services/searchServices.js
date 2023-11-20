import * as httpRequest from "../utils/httpRequest";

export const search = async (keyword) => {
    try {
        const res = await httpRequest.get("music/search", {
            params: {
                keyword,
            },
        });
        return res.data;
    } catch (error) {
        return error.message;
    }
};
