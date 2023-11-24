import React, { createContext, useReducer, useEffect } from "react";
import { songReducer } from "../reducers";
import { LOCAL_STORAGE_CURRENT_MUSIC } from "../utils/constants";
import { getSong } from "../services/getSongServices";
import { SET_SONG } from "../reducers/constants";

export const SongContext = createContext();

const SongContextProvider = ({ children }) => {
    const [songState, dispatch] = useReducer(songReducer, {
        isPlay: false,
        isMute: false,
        songId: null,
        currentIndexPlaylist: 0,
        infoSongPlayer: null,
        srcAudio: "",
        currentTime: 0,
        duration: 0,
        volume: Number(localStorage.getItem("volume")) || 0.5,
        isRepeat: false,
        autoPlay: false,
        playlistSong: [],
        isLyric: false,
        isFailed: false,
        messageFailed: "",
    });

    const loadSong = async () => {
        if (localStorage[LOCAL_STORAGE_CURRENT_MUSIC]) {
            const { musicId, playlist } = JSON.parse(
                localStorage[LOCAL_STORAGE_CURRENT_MUSIC]
            );
            if (musicId && playlist) {
                const res = await getSong(musicId);
                if (res.success) {
                    dispatch({
                        type: SET_SONG,
                        payload: {
                            infoSongPlayer: {
                                ...res.infoSong,
                            },
                            playlistSong: playlist,
                            srcAudio: res.dataSong ? res.dataSong["128"] : "",
                            songId: musicId,
                            currentIndexPlaylist: playlist.findIndex(
                                (item) => item.encodeId === musicId
                            ),
                        },
                    });
                } else {
                    dispatch({
                        type: SET_SONG,
                        payload: {
                            isFailed: true,
                            messageFailed: res.message,
                        },
                    });
                }
            }
        }
    };

    const updateCurrentMusic = async (music, playlist) => {
        try {
            localStorage.setItem(
                LOCAL_STORAGE_CURRENT_MUSIC,
                JSON.stringify({ musicId: music.encodeId, playlist })
            );
            await loadSong();
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        loadSong();
    }, []);

    return (
        <SongContext.Provider
            value={{ songState, dispatch, updateCurrentMusic }}>
            {children}
        </SongContext.Provider>
    );
};

export default SongContextProvider;
