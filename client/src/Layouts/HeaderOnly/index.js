import classNames from "classnames/bind";
import React from "react";
import styles from "./HeaderOnly.module.scss";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import config from "../../config";

const cx = classNames.bind(styles);

const HeaderOnly = ({ children }) => {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header-wrapper")}>
                <div className={cx("header-inner")}>
                    <Link to={config.routes.home}>
                        <div className={cx("logo")}>
                            <img src={images.logo} alt="UniMuzic" />
                            <span className={cx("logo-name")}>UniMuzic</span>
                        </div>
                    </Link>
                </div>
            </header>
            <div className={cx("content")}>{children}</div>
        </div>
    );
};

export default HeaderOnly;
