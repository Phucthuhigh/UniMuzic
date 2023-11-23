import React from "react";
import classNames from "classnames/bind";
import styles from "./Control.module.scss";
import { IoIosRepeat } from "react-icons/io";
import { SET_ISREPEAT } from "../../../../reducers/constants";

const cx = classNames.bind(styles);

const RepeatControl = ({ isRepeat, dispatch }) => {
    const handleToggleRepeat = () => {
        dispatch({ type: SET_ISREPEAT, payload: !isRepeat });
        localStorage.setItem("isRepeat", JSON.stringify(isRepeat));
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
