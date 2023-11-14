import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../assets/images";
import SearchBtn from "../Search";
import { Link } from "react-router-dom";
import Button from "../Button";
import { FaSignInAlt } from "react-icons/fa";

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Link to="/">
                    <div className={cx("logo")}>
                        <img src={images.logo} alt="UniMuzic" />
                        <span className={cx("logo-name")}>UniMuzic</span>
                    </div>
                </Link>
                <SearchBtn />
                <div className={cx("actions")}>
                    <Button text to="/signup">
                        Sign up
                    </Button>
                    <Button rounded outline to="/login">
                        Log in
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
