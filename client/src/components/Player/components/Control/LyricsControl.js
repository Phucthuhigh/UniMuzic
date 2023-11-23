import React from "react";
import classNames from "classnames/bind";
import styles from "./Control.module.scss";
import { PiMicrophoneStageDuotone } from "react-icons/pi";

const cx = classNames.bind(styles);

const LyricsControl = () => {
    return (
        <div className={cx("lyrics")}>
            <PiMicrophoneStageDuotone />
        </div>
    );
};

export default LyricsControl;
