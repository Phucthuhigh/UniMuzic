const getAvatar = (id) => {
    const avatarLink = `${process.env.REACT_APP_BASE_URL}avatar/${id}`;
    return avatarLink;
};

export default getAvatar;
