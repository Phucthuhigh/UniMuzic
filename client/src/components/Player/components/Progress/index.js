import React from "react";
import classNames from "classnames/bind";
import styles from "./Progress.module.scss";
import { formatTime } from "../../../../utils/formatTime";
import { SET_CURRENTTIME } from "../../../../reducers/constants";

const cx = classNames.bind(styles);

const Progress = ({ currentTime, duration, className, dispatch, auRef }) => {
    const handleChangeCurrentTime = (e) => {
        dispatch({
            type: SET_CURRENTTIME,
            payload: (e.target.value * duration) / 100,
        });
        auRef.currentTime = (e.target.value * duration) / 100;
    };

    return (
        <div className={cx("wrapper", className)}>
            <span className={cx("start")}>
                {currentTime ? formatTime(currentTime) : "00:00"}
            </span>
            <div className={cx("bar")}>
                <input
                    type="range"
                    className={cx("seek")}
                    min="0"
                    max="100"
                    value={
                        isNaN(parseInt((currentTime / duration) * 100))
                            ? 0
                            : parseInt((currentTime / duration) * 100)
                    }
                    onChange={handleChangeCurrentTime}
                />
                <div
                    className={cx("bar2")}
                    style={{
                        width: `${parseInt((currentTime / duration) * 100)}%`,
                    }}></div>
                <div
                    className={cx("dot")}
                    style={{
                        left: `${parseInt((currentTime / duration) * 100)}%`,
                    }}></div>
            </div>
            <span className={cx("end")}>
                {currentTime ? formatTime(duration) : "00:00"}
            </span>
        </div>
    );
};

export default Progress;
