import React from "react";
import classNames from "classnames/bind";
import styles from "./Control.module.scss";
import { PiMicrophoneStageDuotone } from "react-icons/pi";
import { SET_ISLYRIC } from "../../../../reducers/constants";

const cx = classNames.bind(styles);

const LyricsControl = ({ isLyric, dispatch }) => {
    const handleLyric = () => {
        dispatch({ type: SET_ISLYRIC, payload: !isLyric });
    };

    return (
        <div
            className={cx("lyrics")}
            style={isLyric ? { color: "var(--primary)" } : {}}
            onClick={handleLyric}>
            <PiMicrophoneStageDuotone />
        </div>
    );
};

export default LyricsControl;
