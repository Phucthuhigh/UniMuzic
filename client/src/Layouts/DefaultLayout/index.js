import React, { useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import { AuthContext } from "../../contexts";
import Spinner from "../../components/Spinner";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    const {
        authState: { authLoading },
    } = useContext(AuthContext);
    return authLoading ? (
        <Spinner />
    ) : (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <Sidebar />
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
