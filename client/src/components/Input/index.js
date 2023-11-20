import classNames from "classnames/bind";
import React from "react";
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

const Input = ({ ...props }) => {
    return (
        <div className={cx("wrapper")}>
            <input {...props} />
        </div>
    );
};

export default Input;
