import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../assets/images";
import SearchBtn from "../Search";

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("logo")}>
                    <img src={images.logo} alt="UniMuzic" />
                    <span className={cx("logo-name")}>UniMuzic</span>
                </div>

                <SearchBtn />

                <div className={cx("actions")}></div>
            </div>
        </header>
    );
};

export default Header;
