import * as httpRequest from "../utils/httpRequest";

export const getHome = async () => {
    try {
        const res = await httpRequest.get("music/home");
        const sliderThumb = res.data.items.filter(
            (item) => item.sectionType === "banner"
        );
        const playlists = res.data.items.filter(
            (item) => item.sectionType === "playlist"
        );
        const release = res.data.items.filter(
            (item) => item.sectionType === "new-release"
        );
        return { success: true, items: [sliderThumb, playlists, release] };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
