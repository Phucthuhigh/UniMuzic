import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../../assets/images";
import SearchBtn from "../Search";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Image from "../../../components/Image";
import Menu from "../../../components/Popper/Menu";
import { CiUser } from "react-icons/ci";
import { GoSignOut } from "react-icons/go";
import { MdFavoriteBorder } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import config from "../../../config";
import { AuthContext } from "../../../contexts";
import getAvatar from "../../../utils/getAvatar";

const cx = classNames.bind(styles);

const Header = () => {
    const {
        authState: { isAuthenticated, user },
    } = useContext(AuthContext);

    const currentUser = isAuthenticated;

    const userMenu = [
        {
            icon: <CiUser />,
            title: "Trang cá nhân",
            to: "/dashboard",
        },
        {
            icon: <MdFavoriteBorder />,
            title: "Sở thích của tôi",
            to: config.routes.favorite,
        },
        {
            icon: <GoHistory />,
            title: "Lịch sử nghe nhạc",
            to: config.routes.history,
        },
        {
            icon: <GoSignOut />,
            title: "Đăng xuất",
            to: config.routes.logout,
            separate: true,
        },
    ];

    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Link to={config.routes.home}>
                    <div className={cx("logo")}>
                        <img src={images.logo} alt="UniMuzic" />
                        <span className={cx("logo-name")}>UniMuzic</span>
                    </div>
                </Link>
                <SearchBtn />
                <div className={cx("actions")}>
                    {currentUser ? (
                        <Menu items={userMenu} trigger="click" hideOnClick>
                            <div className={cx("user-info")}>
                                <Image
                                    src={getAvatar(user._id)}
                                    alt={user.username}
                                    className={cx("user-avatar")}
                                />
                                <h4>{user.username}</h4>
                            </div>
                        </Menu>
                    ) : (
                        <>
                            <Button text to="/signup">
                                Đăng ký
                            </Button>
                            <Button rounded outline to="/login">
                                Đăng nhập
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
