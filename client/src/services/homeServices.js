import * as httpRequest from "../utils/httpRequest";

export const getHome = async () => {
    try {
        const res = await httpRequest.get("music/home");
        const sliderThumb = res.data.items[0];
        const playlists = res.data.items.splice(3, 5);
        const release = res.data.items[2];
        return { success: true, items: [sliderThumb, playlists, release] };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
