import React from "react";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import { SET_ISPLAY } from "../../../../reducers/constants";
import classNames from "classnames/bind";
import styles from "./Control.module.scss";

const cx = classNames.bind(styles);

const PlayControl = ({ isPlay, dispatch, auRef }) => {
    const handlePlayMusic = () => {
        const isPlaying =
            isPlay &&
            auRef.currentTime > 0 &&
            !auRef.paused &&
            !auRef.ended &&
            auRef.readyState > auRef.HAVE_CURRENT_DATA;
        if (isPlaying) {
            dispatch({ type: SET_ISPLAY, payload: false });
            if (auRef) {
                auRef.pause();
            }
        } else {
            dispatch({ type: SET_ISPLAY, payload: true });
            if (auRef) {
                auRef.play();
            }
        }
    };

    return (
        <div className={cx("play")} onClick={handlePlayMusic}>
            {auRef && (auRef.paused || auRef.currentTime <= 0) ? (
                <IoPlayCircleOutline />
            ) : (
                <IoPauseCircleOutline />
            )}
        </div>
    );
};

export default PlayControl;
