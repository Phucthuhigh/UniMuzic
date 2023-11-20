import classNames from "classnames/bind";
import React, { useContext } from "react";
import styles from "./Sidebar.module.scss";
import { Menu, MenuItem } from "./Menu";
import config from "../../../config";
import { FaHome } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import Button from "../../../components/Button";
import { AuthContext } from "../../../contexts";

const cx = classNames.bind(styles);

const Sidebar = () => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    const currentUser = isAuthenticated;
    return (
        <aside className={cx("wrapper")}>
            <Menu>
                <div className={cx("default-actions")}>
                    <MenuItem
                        title="Khám phá"
                        icon={<FaHome />}
                        to={config.routes.home}
                    />
                    <MenuItem
                        title="BXH"
                        icon={<FaChartLine />}
                        to={config.routes.bxh}
                    />
                    <MenuItem
                        title="Top 100"
                        icon={<FaStar />}
                        to={config.routes.top100}
                    />
                </div>
                {currentUser ? (
                    <>
                        <MenuItem
                            separate
                            title="Sở thích"
                            icon={<MdFavorite />}
                            to={config.routes.favorite}
                        />
                        <MenuItem
                            title="Lịch sử"
                            icon={<FaHistory />}
                            to={config.routes.history}
                        />
                    </>
                ) : (
                    <>
                        <div className={cx("non-user-actions")}>
                            <p>Đăng nhập để làm được nhiều thứ hơn.</p>
                            <Button
                                outline
                                className={cx("login-btn")}
                                to={config.routes.login}>
                                Đăng nhập
                            </Button>
                        </div>
                    </>
                )}
            </Menu>
        </aside>
    );
};

export default Sidebar;
