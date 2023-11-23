import React from "react";
import { RxTrackNext } from "react-icons/rx";
import classNames from "classnames/bind";
import styles from "./Control.module.scss";
import {
    SET_CURRENTINDEXPLAYLIST,
    SET_SONGID,
} from "../../../../reducers/constants";

const cx = classNames.bind(styles);

const NextControl = ({
    currentIndexPlaylist,
    playlist,
    updateCurrentMusic,
    dispatch,
}) => {
    const handleNextSong = async () => {
        if (playlist !== undefined && playlist.length > 0) {
            let currentIndex;

            if (currentIndexPlaylist === playlist.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex = currentIndexPlaylist + 1;
                while (playlist[currentIndex].streamingStatus !== 1)
                    currentIndex++;
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
        <div className={cx("next")} onClick={handleNextSong}>
            <RxTrackNext />
        </div>
    );
};

export default NextControl;
