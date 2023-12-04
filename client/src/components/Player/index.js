import React, { useContext, useRef } from "react";
import styles from "./Player.module.scss";
import classNames from "classnames/bind";
import { SongContext } from "../../contexts";
import {
    NextControl,
    PlayControl,
    PrevControl,
    MusicCard,
    LyricsControl,
    RepeatControl,
    VolumeControl,
} from "./components/Control";
import { SET_CURRENTINDEXPLAYLIST, SET_SONGID } from "../../reducers/constants";
import { BsExclamationCircleFill } from "react-icons/bs";

import Progress from "./components/Progress";
import {
    SET_CURRENTTIME,
    SET_DURATION,
    SET_ISPLAY,
} from "../../reducers/constants";
import AlertMessage from "../AlertMessage";
import Lyric from "./components/Lyric";

const cx = classNames.bind(styles);

const Player = () => {
    const {
        songState: {
            infoSongPlayer,
            isPlay,
            srcAudio,
            currentTime,
            duration,
            volume,
            isMute,
            isRepeat,
            playlistSong,
            currentIndexPlaylist,
            isFailed,
            messageFailed,
            isLyric,
        },
        dispatch,
        updateCurrentMusic,
    } = useContext(SongContext);

    const auRef = useRef(null);

    return !infoSongPlayer ? (
        <></>
    ) : isFailed ? (
        <AlertMessage
            type="error"
            title="Thất bại"
            message={messageFailed}
            icon={<BsExclamationCircleFill />}
        />
    ) : (
        <div className={cx("wrapper")}>
            <div className={cx("player")}>
                <div className={cx("left")}>
                    <div className={cx("wave", { [styles.active]: isPlay })}>
                        <div className={cx("wave-item")}></div>
                        <div className={cx("wave-item")}></div>
                        <div className={cx("wave-item")}></div>
                    </div>
                    <MusicCard data={infoSongPlayer} />
                </div>
                <div className={cx("mid")}>
                    <div className={cx("mid-control")}>
                        <div className={cx("item")}>
                            <PrevControl
                                playlist={playlistSong}
                                currentIndexPlaylist={currentIndexPlaylist}
                                updateCurrentMusic={updateCurrentMusic}
                                dispatch={dispatch}
                            />
                        </div>
                        <div className={cx("item")}>
                            <PlayControl
                                isPlay={isPlay}
                                dispatch={dispatch}
                                auRef={auRef.current}
                            />
                        </div>
                        <div className={cx("item")}>
                            <NextControl
                                playlist={playlistSong}
                                currentIndexPlaylist={currentIndexPlaylist}
                                updateCurrentMusic={updateCurrentMusic}
                                dispatch={dispatch}
                            />
                        </div>
                    </div>
                    <Progress
                        currentTime={currentTime}
                        duration={duration}
                        dispatch={dispatch}
                        auRef={auRef.current}
                    />
                </div>
                <div className={cx("right")}>
                    <div className={cx("item")}>
                        <LyricsControl isLyric={isLyric} dispatch={dispatch} />
                    </div>
                    <div className={cx("item")}>
                        <RepeatControl
                            isRepeat={isRepeat}
                            dispatch={dispatch}
                        />
                    </div>
                    <div className={cx("item")}>
                        <VolumeControl
                            volume={volume}
                            isMute={isMute}
                            dispatch={dispatch}
                            auRef={auRef.current}
                        />
                    </div>
                </div>

                <audio
                    ref={auRef}
                    src={srcAudio}
                    hidden
                    loop={isRepeat}
                    autoPlay
                    crossOrigin="anonymous"
                    onTimeUpdate={() => {
                        if (auRef.current) {
                            dispatch({
                                type: SET_CURRENTTIME,
                                payload: auRef.current.currentTime,
                            });
                            if (!auRef.current.paused) {
                                dispatch({
                                    type: SET_ISPLAY,
                                    payload: true,
                                });
                            }
                        }
                    }}
                    onLoadedData={() => {
                        if (auRef.current) {
                            dispatch({
                                type: SET_DURATION,
                                payload: auRef.current.duration,
                            });
                        }
                    }}
                    onEnded={async () => {
                        if (
                            playlistSong !== undefined &&
                            playlistSong.length > 0
                        ) {
                            let currentIndex;

                            if (
                                currentIndexPlaylist ===
                                playlistSong.length - 1
                            ) {
                                currentIndex = 0;
                            } else {
                                currentIndex = currentIndexPlaylist + 1;
                                while (
                                    playlistSong[currentIndex]
                                        .streamingStatus !== 1
                                )
                                    currentIndex++;
                            }

                            dispatch({
                                type: SET_CURRENTINDEXPLAYLIST,
                                payload: currentIndex,
                            });

                            dispatch({
                                type: SET_SONGID,
                                payload: playlistSong[currentIndex].encodeId,
                            });

                            await updateCurrentMusic(
                                playlistSong[currentIndex],
                                playlistSong
                            );
                        }
                    }}
                />
            </div>

            <Lyric
                isLyric={isLyric}
                info={infoSongPlayer}
                currentTime={currentTime}
                dispatch={dispatch}
                auRef={auRef.current}
            />
        </div>
    );
};

export default Player;
