export const LOCAL_STORAGE_ACCESS_TOKEN_NAME = "unimuzic-user-access-token";
export const LOCAL_STORAGE_CURRENT_MUSIC = "unimuzic-current-music";
export const BASE_URL =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api/"
        : "https://uni-muzic-api.vercel.app/api/";
