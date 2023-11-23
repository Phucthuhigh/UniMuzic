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
    });

    const loadSong = async () => {
        if (localStorage[LOCAL_STORAGE_CURRENT_MUSIC]) {
            const { music, playlist } = JSON.parse(
                localStorage[LOCAL_STORAGE_CURRENT_MUSIC]
            );
            if (music && playlist) {
                const res = await getSong(music.encodeId);
                if (res.success) {
                    dispatch({
                        type: SET_SONG,
                        payload: {
                            infoSongPlayer: {
                                ...music,
                            },
                            playlistSong: playlist,
                            srcAudio: res.items ? res.items["128"] : "",
                            songId: music.encodeId,
                            currentIndexPlaylist: playlist.findIndex(
                                (item) => item.encodeId === music.encodeId
                            ),
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
                JSON.stringify({ music, playlist })
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
