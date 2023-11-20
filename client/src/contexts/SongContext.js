import React, { createContext, useReducer, useEffect } from "react";
import songReducer from "../reducers/songReducer";
import { LOCAL_STORAGE_CURRENT_MUSIC } from "../utils/constants";
import { getSong } from "../services/getSongServices";
import { SET_SONG } from "../reducers/constants";

export const SongContext = createContext();

const SongContextProvider = ({ children }) => {
    const [songState, dispatch] = useReducer(songReducer, {
        songLoading: true,
        currentSong: null,
    });

    const loadSong = async () => {
        if (localStorage[LOCAL_STORAGE_CURRENT_MUSIC]) {
            const res = await getSong(
                localStorage[LOCAL_STORAGE_CURRENT_MUSIC]
            );
            if (res.success) {
                dispatch({
                    type: SET_SONG,
                    payload: { currentSong: res.items },
                });
            }
        }
    };

    const updateCurrentMusic = async (id) => {
        try {
            localStorage.setItem(LOCAL_STORAGE_CURRENT_MUSIC, id);
            await loadSong();
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        loadSong();
    }, []);

    return (
        <SongContext.Provider value={{ songState, updateCurrentMusic }}>
            {children}
        </SongContext.Provider>
    );
};

export default SongContextProvider;
