import classNames from "classnames/bind";
import styles from "./AlertMessage.module.scss";
import { IoCloseOutline } from "react-icons/io5";

const cx = classNames.bind(styles);

const AlertMessage = ({ type, title, message, icon, onClick }) => {
    return (
        <div className={cx("toast", `toast--${type}`)}>
            <div className={cx("toast__icon")}>{icon}</div>
            <div className={cx("toast__body")}>
                <h3 className={cx("toast__title")}>{title}</h3>
                <p className={cx("toast__msg")}>{message}</p>
            </div>
            <div className={cx("toast__close")} onClick={onClick}>
                <IoCloseOutline />
            </div>
        </div>
    );
};

export default AlertMessage;
