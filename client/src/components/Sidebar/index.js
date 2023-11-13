import classNames from "classnames/bind";
import React from "react";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

const Sidebar = () => {
    return <aside className={cx("wrapper")}>Sidebar</aside>;
};

export default Sidebar;
