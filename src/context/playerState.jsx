import React, {createContext, useReducer} from "react";
import {
    cancelLike, getPlaylist,
    makeLiked,
    playerReducer, reversePlaylist,
    setCurrentTrack, setFirstTrack,
    setPlaying,
    setRepeat, setReverse,
    setShuffle, shufflePlaylist
} from "./playerReducer";

const initialState = {
    tracks: [],
    currentTrack: {
        // id: tracks[0].id,
        // name: tracks[0].name,
        // artist: tracks[0].artist,
        // sound: tracks[0].sound,
        // like: tracks[0].like,
        // cover: tracks[0].cover,
        // duration: tracks[0].duration,
    },
    tracksNumber: 8, //НА ИЗМЕНЕНИЕ!!!!!!!!!!!!!!!!!!!!!!!
    repeat: false,
    shuffle: false,
    reverse: false,
    playing: false,
};

export const PlayerContext = createContext();
export const PlayerState = (props) => {
    const [state, dispatch] = useReducer(playerReducer, initialState);
    const setPlaylist = (playlist) => {
        dispatch(getPlaylist(playlist))
    }
    const setTrack = (id) => {
        dispatch(setCurrentTrack(id))
    };
    //---------------------------------------------------------------------------------
    const prevTrack = () => {
        const index = state.tracks.findIndex(track => track.id === state.currentTrack.id);
        index
            ? dispatch(setCurrentTrack(state.tracks[index - 1].id))
            : dispatch(setCurrentTrack(state.tracks[state.tracks.length - 1].id))
    };

    const nextTrack = () => {
        const index = state.tracks.findIndex(track => track.id === state.currentTrack.id);
        index === (state.tracks.length - 1)
            ? dispatch(setCurrentTrack(state.tracks[0].id))
            : dispatch(setCurrentTrack(state.tracks[index + 1].id))
    };
    //---------------------------------------------------------------------------------
    const togglePlaying = (playing) => {
        dispatch(setPlaying(playing))
    };
    const toggleRepeat = () => {
        dispatch(setRepeat());
    };
    const handleEnd = () => {
        nextTrack()
    };
    const clickLike = (id) => {
        console.log(state.tracks)
        dispatch(makeLiked(id))
        console.log(state.tracks)
    };
    const clickUnlike = (track) => {
        dispatch(cancelLike(track))
    };
    const shuffleTracklist = () => {
        dispatch(shufflePlaylist())
        dispatch(setShuffle())
    }
    const reverseTracklist = () => {
        dispatch(reversePlaylist())
        dispatch(setReverse())
    }
    const getFirstTrack = (track) => {
        dispatch(setFirstTrack(track))
    }
    return (
        <PlayerContext.Provider
            value={{
                currentTrack: state.currentTrack,
                tracks: state.tracks,
                repeat: state.repeat,
                reverse: state.reverse,
                shuffle: state.shuffle,
                playing: state.playing,
                //audio: state.audio,
                tracksNumber: state.tracksNumber,
                nextTrack,
                prevTrack,
                setCurrentTrack,
                toggleRepeat,
                togglePlaying,
                handleEnd,
                setTrack,
                clickLike,
                clickUnlike,
                shuffleTracklist,
                reverseTracklist,
                setPlaylist,
                getFirstTrack
            }}>
            {props.children}
        </PlayerContext.Provider>
    );
};
