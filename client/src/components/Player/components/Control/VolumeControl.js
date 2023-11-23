import React from "react";
import classNames from "classnames/bind";
import styles from "./Control.module.scss";
import {
    IoVolumeHighOutline,
    IoVolumeMuteOutline,
    IoVolumeMediumOutline,
    IoVolumeLowOutline,
} from "react-icons/io5";
import { SET_ISMUTE, SET_VOLUME } from "../../../../reducers/constants";

const cx = classNames.bind(styles);

const VolumeControl = ({ volume, isMute, dispatch, auRef, className }) => {
    const handleChangeCurrentVolume = (e) => {
        auRef.volume = e.target.value / 100;
        dispatch({
            type: SET_VOLUME,
            payload: parseFloat(auRef.volume),
        });
        localStorage.setItem("volume", JSON.stringify(auRef.volume));
    };

    const handleMuteVolume = () => {
        if (isMute) {
            auRef.volume = 0.5;
            dispatch({
                type: SET_ISMUTE,
                payload: false,
            });
        } else {
            auRef.volume = 0;
            dispatch({
                type: SET_ISMUTE,
                payload: true,
            });
        }
        dispatch({
            type: SET_VOLUME,
            payload: parseFloat(auRef.volume),
        });
        localStorage.setItem("volume", JSON.stringify(auRef.volume));
    };

    let Volume;
    if (volume === 0) Volume = IoVolumeMuteOutline;
    if (volume > 0) Volume = IoVolumeLowOutline;
    if (volume > 0.25) Volume = IoVolumeMediumOutline;
    if (volume > 0.5) Volume = IoVolumeHighOutline;

    return (
        <div className={cx("volume")}>
            <div className={cx("volume-icon")} onClick={handleMuteVolume}>
                <Volume />
            </div>
            <div className={cx("volume-progress", className)}>
                <div className={cx("bar")}>
                    <input
                        type="range"
                        className={cx("seek")}
                        min="0"
                        max="100"
                        value={volume * 100}
                        onChange={handleChangeCurrentVolume}
                    />
                    <div
                        className={cx("bar2")}
                        style={{
                            width: `${volume * 100}%`,
                        }}></div>
                    <div
                        className={cx("dot")}
                        style={{
                            left: `${volume * 100}%`,
                        }}></div>
                </div>
            </div>
        </div>
    );
};

export default VolumeControl;
