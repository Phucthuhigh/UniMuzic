import { BASE_URL } from "./constants";

const getAvatar = (id) => {
    const avatarLink = `${BASE_URL}avatar/${id}`;
    return avatarLink;
};

export default getAvatar;
