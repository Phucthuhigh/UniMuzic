import React from "react";
import classNames from "classnames/bind";
import styles from "./Control.module.scss";
import { IoIosRepeat } from "react-icons/io";
import { SET_ISREPEAT } from "../../../../reducers/constants";

const cx = classNames.bind(styles);

const RepeatControl = ({ isRepeat, dispatch }) => {
    const handleToggleRepeat = () => {
        localStorage.setItem("isRepeat", JSON.stringify(!isRepeat));
        dispatch({ type: SET_ISREPEAT, payload: !isRepeat });
    };

    return (
        <div
            className={cx("repeat")}
            style={isRepeat ? { color: "var(--primary)" } : {}}
            onClick={handleToggleRepeat}>
            <IoIosRepeat />
        </div>
    );
};

export default RepeatControl;
