import classNames from "classnames/bind";
import React from "react";
import styles from "./Badge.module.scss";

const cx = classNames.bind(styles);

const Badge = ({ title, style }) => {
    return (
        <span style={style} className={cx("badge")}>
            {title}
        </span>
    );
};

export default Badge;
