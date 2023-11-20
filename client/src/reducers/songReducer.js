import { SET_SONG } from "./constants";

const songReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_SONG:
            return {
                ...state,
                songLoading: false,
                ...payload,
            };
        default:
            throw new Error("Action invalid");
    }
};

export default songReducer;
