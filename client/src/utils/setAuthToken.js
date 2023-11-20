import httpRequest from "./httpRequest";

const setAuthToken = (token) => {
    if (token) {
        httpRequest.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;
    } else {
        delete httpRequest.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;
