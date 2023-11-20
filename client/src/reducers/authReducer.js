import { SET_AUTH } from "./constants";

const authReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading: false,
                ...payload,
            };
        default:
            throw new Error("Action invalid");
    }
};

export default authReducer;
