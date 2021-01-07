import React, {createContext, useReducer} from "react";
import {
    cancelLike, getAlbums, getCurrentAlbum, getPlaylist, getStorageAlbum, getStorageTrack,
    makeLiked,
    playerReducer, reversePlaylist,
    setCurrentTrack, setFirstTrack,
    setPlaying,
    setRepeat, setReverse,
    setShuffle, shufflePlaylist
} from "./playerReducer";

const initialState = {
    albums: [],
    currentTrack: {},
    currentAlbum: {},
    repeat: false,
    shuffle: false,
    reverse: false,
    playing: false,
};

export const PlayerContext = createContext();
export const PlayerState = (props) => {
    const [state, dispatch] = useReducer(playerReducer, initialState);
    const setAlbums = (albums) => {
        dispatch(getAlbums(albums))
    }
    // const setPlaylist = (playlist) => {
    //     dispatch(getPlaylist(playlist))
    // }
    const setTrack = (albumId, trackId) => {
        dispatch(setCurrentTrack(albumId, trackId))
    };
    const setCurrentAlbum = (albumId) => {
        dispatch(getCurrentAlbum(albumId))
    }
    // const setStorageAlbum = (album) => {
    //     dispatch(getStorageAlbum(album))
    // }
    const setStorageTrack = (trackId) => {
        dispatch(getStorageTrack(trackId))
    }
    //---------------------------------------------------------------------------------
    const prevTrack = () => {
        const index = state.currentAlbum.tracks.findIndex(track => track.id === state.currentTrack.id);
        index
            ? dispatch(setCurrentTrack(state.currentAlbum.id, state.currentAlbum.tracks[index - 1].id))
            : dispatch(setCurrentTrack(state.currentAlbum.id, state.currentAlbum.tracks[state.currentAlbum.tracks.length - 1].id))
    };

    const nextTrack = () => {
        const index = state.currentAlbum.tracks.findIndex(track => track.id === state.currentTrack.id);
        index === (state.currentAlbum.tracks.length - 1)
            ? dispatch(setCurrentTrack(state.currentAlbum.id, state.currentAlbum.tracks[0].id))
            : dispatch(setCurrentTrack(state.currentAlbum.id, state.currentAlbum.tracks[index + 1].id))
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
    const reverseTracklist = (albumId) => {
        dispatch(reversePlaylist(albumId))
        dispatch(setReverse())
    }
    // const getFirstTrack = (track) => {
    //     dispatch(setFirstTrack(track))
    // }
    return (
        <PlayerContext.Provider
            value={{
                currentTrack: state.currentTrack,
                currentAlbum: state.currentAlbum,
                //tracks: state.tracks,
                repeat: state.repeat,
                reverse: state.reverse,
                shuffle: state.shuffle,
                playing: state.playing,
                //audio: state.audio,
                //tracksNumber: state.tracksNumber,
                albums: state.albums,
                nextTrack,
                prevTrack,
                //setCurrentTrack,
                toggleRepeat,
                togglePlaying,
                handleEnd,
                setTrack,
                clickLike,
                clickUnlike,
                shuffleTracklist,
                reverseTracklist,
                // setPlaylist,
                // getFirstTrack,
                setAlbums,
                setCurrentAlbum,
                // setStorageAlbum,
                setStorageTrack
            }}>
            {props.children}
        </PlayerContext.Provider>
    );
};
