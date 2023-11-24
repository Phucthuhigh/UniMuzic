import {
    SET_SONG,
    SET_ISPLAY,
    SET_DURATION,
    SET_CURRENTTIME,
    SET_VOLUME,
    SET_ISMUTE,
    SET_ISREPEAT,
    SET_CURRENTINDEXPLAYLIST,
    SET_SONGID,
    SET_ISLYRIC,
} from "./constants";

const songReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_SONG:
            return {
                ...state,
                ...payload,
            };
        case SET_ISPLAY:
            return {
                ...state,
                isPlay: payload,
            };
        case SET_DURATION:
            return {
                ...state,
                duration: payload,
            };
        case SET_CURRENTTIME:
            return {
                ...state,
                currentTime: payload,
            };
        case SET_VOLUME:
            return {
                ...state,
                volume: payload,
            };
        case SET_ISMUTE:
            return {
                ...state,
                isMute: payload,
            };
        case SET_ISREPEAT:
            return {
                ...state,
                isRepeat: payload,
            };
        case SET_CURRENTINDEXPLAYLIST:
            return {
                ...state,
                currentIndexPlaylist: payload,
            };
        case SET_SONGID:
            return {
                ...state,
                songId: payload,
            };
        case SET_ISLYRIC:
            return {
                ...state,
                isLyric: payload,
            };
        default:
            throw new Error("Action invalid");
    }
};

export default songReducer;
