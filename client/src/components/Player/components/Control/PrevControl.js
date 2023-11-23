import React from "react";
import { RxTrackPrevious } from "react-icons/rx";
import classNames from "classnames/bind";
import styles from "./Control.module.scss";
import {
    SET_CURRENTINDEXPLAYLIST,
    SET_SONGID,
} from "../../../../reducers/constants";

const cx = classNames.bind(styles);

const PrevControl = ({
    playlist,
    currentIndexPlaylist,
    dispatch,
    updateCurrentMusic,
}) => {
    const handlePrevSong = async () => {
        if (playlist !== undefined && playlist.length > 0) {
            let currentIndex;

            if (currentIndexPlaylist === 0) {
                currentIndex = playlist.length - 1;
            } else {
                currentIndex = currentIndexPlaylist - 1;
                while (playlist[currentIndex].streamingStatus !== 1)
                    currentIndex--;
            }

            dispatch({ type: SET_CURRENTINDEXPLAYLIST, payload: currentIndex });

            dispatch({
                type: SET_SONGID,
                payload: playlist[currentIndex].encodeId,
            });

            await updateCurrentMusic(playlist[currentIndex], playlist);
        }
    };

    return (
        <div className={cx("prev")} onClick={handlePrevSong}>
            <RxTrackPrevious />
        </div>
    );
};

export default PrevControl;
