const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
const TOGGLE_SHUFFLE = "TOGGLE_SHUFFLE";
const TOGGLE_REPEAT = "TOGGLE_REPEAT";
const TOGGLE_PLAYING = "TOGGLE_PLAYING";
const MAKE_LIKED = "MAKE_LIKED";
const CANCEL_LIKE = "CANCEL_LIKE";
const SHUFFLE_PLAYLIST = "SHUFFLE_PLAYLIST";
const REVERSE_PLAYLIST = "REVERSE_PLAYLIST";
const SET_REVERSE = "SET_REVERSE";
// const GET_PLAYLIST = "GET_PLAYLIST";
// const SET_FIRST_TRACK = "SET_FIRST_TRACK";
const GET_ALBUMS = "GET_ALBUMS";
const SET_CURRENT_ALBUM = "SET_CURRENT_ALBUM";
// const SET_STORAGE_ALBUM = "SET_STORAGE_ALBUM";
const SET_STORAGE_TRACK = "SET_STORAGE_TRACK";

export const getAlbums = (albums) => ({type: GET_ALBUMS, albums});
export const getCurrentAlbum = (albumId) => ({type: SET_CURRENT_ALBUM, albumId});
export const setCurrentTrack = (albumId, trackId) => ({type: SET_CURRENT_TRACK, albumId, trackId});
// export const getStorageAlbum = (album) => ({type: SET_STORAGE_ALBUM, album})
export const getStorageTrack = (trackId) => ({type: SET_STORAGE_TRACK, trackId})

export const setPlaying = (playing) => ({type: TOGGLE_PLAYING, playing});
export const setRepeat = () => ({type: TOGGLE_REPEAT});
export const setShuffle = () => ({type: TOGGLE_SHUFFLE});
export const setReverse = () => ({type: SET_REVERSE});
export const makeLiked = (id) => ({type: MAKE_LIKED, id});
export const cancelLike = (id) => ({type: CANCEL_LIKE, id});
export const shufflePlaylist = () => ({type: SHUFFLE_PLAYLIST});
export const reversePlaylist = () => ({type: REVERSE_PLAYLIST});
// export const getPlaylist = (playlist) => ({type: GET_PLAYLIST, playlist});
// export const setFirstTrack = () => ({type: SET_FIRST_TRACK});
// export const setFirstTrack = (track) => ({type: SET_FIRST_TRACK, track});

export const playerReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case GET_ALBUMS: {
            return {
                ...state,
                albums: action.albums
            }
        }
        case SET_CURRENT_ALBUM: {
            const alId = action.albumId.substring(1,action.albumId.length-1)
            const currAl = state.albums?.find(album => album.id === alId)
            return {
                ...state,
                currentAlbum: currAl
            }
        }
        case SET_STORAGE_TRACK: {
            const trId = action.trackId.substring(1,action.trackId.length-1)
            return {
                ...state,
                currentTrack: state.currentAlbum.tracks.find(track => track.id === trId)
            }
        }
        case SHUFFLE_PLAYLIST: {
            for (let i = state.tracks.length - 1; i > 0; --i) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = state.tracks[i];
                state.tracks[i] = state.tracks[j];
                state.tracks[j] = temp;
            }
            return {
                ...state,
            }
        }
        case REVERSE_PLAYLIST: {
            return {
                ...state,
                tracks: state.tracks.reverse()
            }
        }
        case TOGGLE_PLAYING: {
            return {
                ...state,
                playing: action.playing
            }
        }
        case SET_CURRENT_TRACK: {
            localStorage.setItem('playingAlbum', JSON.stringify(action.albumId))
            localStorage.setItem('playingTrack', JSON.stringify(action.trackId))
            const currentAlbum = state.albums.find(album => album.id === action.albumId)
            if (currentAlbum) {
                return {
                    ...state,
                    currentAlbum: currentAlbum,
                    currentTrack: state.currentAlbum?.tracks?.find(track => track.id === action.trackId),
                    playing: true
                }
            }
        }
        case TOGGLE_SHUFFLE: {
            return {
                ...state,
                shuffle: !state.shuffle
            }
        }
        case TOGGLE_REPEAT: {
            return {
                ...state,
                repeat: !state.repeat
            }
        }
        case SET_REVERSE: {
            return {
                ...state,
                reverse: !state.reverse
            }
        }
        case MAKE_LIKED: {
            return {
                ...state,
                tracks: state.tracks.map(track => {
                    if (track.id === action.id) {
                        return {...track, like: true}
                    }
                    return track
                })
            }
        }
        case CANCEL_LIKE: {
            console.log(state.tracks)
            return {
                ...state,
                tracks: state.tracks.map(track => {
                    if (track.id === action.id) return {...track, like: false}
                })
            }
        }
        default:
            return state
    }
};