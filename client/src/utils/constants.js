export const LOCAL_STORAGE_ACCESS_TOKEN_NAME = "unimuzic-user-access-token";
export const LOCAL_STORAGE_CURRENT_MUSIC = "unimuzic-current-music";
export const BASE_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api`
    : process.env.REACT_APP_BASE_URL;
