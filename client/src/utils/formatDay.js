export const formatDay = (sec_num) => {
    const date = new Date(sec_num);
    return date.toLocaleDateString("vi-VI");
};
