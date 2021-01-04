import React, {useContext} from "react";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import {Track} from "./Track";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Tooltip from "@material-ui/core/Tooltip";
import {PlayerContext} from "../../context/playerState";
import {graphicHeight} from "../Graphics/GraphicStyle";
import {headerHeight} from "../Header/HeaderStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    playlistRoot: {
        height: `${graphicHeight}vh`,
        marginTop: `${headerHeight}vh`,
        margin: "auto",
        padding: 10,
        boxSizing: 'border-box',
        width: "60%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },
        [theme.breakpoints.up('sm')]: {
            width: "80%",
        },
        boxShadow: "none",
        backgroundColor: `primary`,
        display: "flex"
    },
    playlistHeader: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: '1px solid #333',
    },
    input: {
        display: 'none',
    },
    playCover: {
        width: 50,
        height: 50,
        overflow: 'hidden',
    },
    playImg: {
        width: 50,
    },
    playContent: {
        display: 'flex',
        justifyContent: "space-between",
    },
    playlistsHeader: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        borderBottom: '1px solid #333',
        height: 48,
        marginBottom: 8,
        marginLeft: 30,
    },
    playlistsInfo: {
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 5,
        marginLeft: 30,
        //borderLeft: '1px solid #333',
    },
    playlistList: {
        padding: '0, 10',
        height: '48vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
    albumCover: {
        width: 80,
        padding: 10,
    },
}));

export const Playlists = ({audio, formatTime, album}) => {
    const classes = useStyles();
    const {
        shuffle, setTrack, playing, currentTrack, clickLike, reverse,
        clickUnlike, togglePlaying, shuffleTracklist, reverseTracklist
    } = useContext(PlayerContext);
    const chooseTrack = (albumId, trackId) => {
        setTrack(albumId, trackId);



        if (trackId === currentTrack.id) {
            if (audio.current.paused) {
                audio.current.play();
                togglePlaying(true);
            } else {
                audio.current.pause();
                togglePlaying(false);
            }
        } else {
            setTrack(albumId, trackId);
            audio.current.play();
            togglePlaying(true);
        }
    };
    const likeTrack = (track) => {
        clickLike(track)
    };
    const tracksList = album?.tracks.map((track) => <Track key={track.id}
                                                           album={album}
                                                           track={track}
                                                           chooseTrack={chooseTrack}
                                                           currentTrack={currentTrack}
                                                           likeTrack={likeTrack}
                                                           playing={playing}
                                                           formatTime={formatTime}

    />)

    return (
        <div className={classes.playlistRoot}>
            <div style={{flexGrow: 1, width: '100%'}}>
                <div className={classes.playlistHeader}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={album?.albumCover} alt="album cover" className={classes.albumCover}/>
                        <div>
                            <Typography variant="h3">{album?.albumName}</Typography>
                            <Typography variant="body2">{album?.numberOfTracks} tracks
                                | {formatTime(album?.albumDuration)}</Typography>
                        </div>
                    </div>

                    <span style={{display: 'flex'}}>
                    <Tooltip title="shuffle" placement="top">
                        <IconButton aria-label="shuffle" onClick={shuffleTracklist}>
                            {shuffle ? <ShuffleIcon color='secondary'/> : <ShuffleIcon/>}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="reverse" placement="top">
                        <IconButton onClick={reverseTracklist}>
                            {reverse ? <SwapVertIcon color='secondary'/> : <SwapVertIcon/>}
                        </IconButton>
                    </Tooltip>
                    {/*<Tooltip title="upload" placement="top">*/}
                    {/*    <div>*/}
                    {/*        <input accept="audio/*" className={classes.input} id="icon-button-file" type="file"/>*/}
                    {/*        <label htmlFor="icon-button-file">*/}
                    {/*            <IconButton color="secondary" aria-label="upload track" component="span">*/}
                    {/*                <CloudUploadIcon/>*/}
                    {/*            </IconButton>*/}
                    {/*        </label>*/}
                    {/*    </div>*/}
                    {/*</Tooltip>*/}
                </span>
                </div>
                <List style={{flexGrow: 1, width: '100%'}}>
                    {tracksList}
                </List>
            </div>

            {/*<div>*/}
            {/*    <div className={classes.playlistsHeader}>*/}
            {/*        <Typography style={{marginRight: 10}}> PLAYLISTS</Typography>*/}
            {/*        <Tooltip title="reverse" placement="top">*/}
            {/*            <IconButton onClick={addPlaylist}>*/}
            {/*                <PlaylistAddIcon/>*/}
            {/*            </IconButton>*/}
            {/*        </Tooltip>*/}
            {/*    </div>*/}
            {/*    <div className={classes.playlistList}>*/}
            {/*        {playlists.map(playlist => <ListItem button key={playlist.id} className={classes.playlistsInfo}>*/}
            {/*            <div className={classes.playCover}>*/}
            {/*                <img src={playlist.cover} alt="playlist_cover" className={classes.playImg}/>*/}
            {/*            </div>*/}
            {/*            <Typography variant="body2" gutterBottom style={{marginLeft: 8}}>*/}
            {/*                {playlist.name}*/}
            {/*            </Typography>*/}
            {/*        </ListItem>)}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
};