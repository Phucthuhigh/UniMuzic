import React from "react";
import classNames from "classnames/bind";
import styles from "./Spinner.module.scss";

const cx = classNames.bind(styles);

const Spinner = () => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("loader")}>
                <div className={cx("outer")}></div>
                <div className={cx("middle")}></div>
                <div className={cx("inner")}></div>
            </div>
        </div>
    );
};

export default Spinner;
