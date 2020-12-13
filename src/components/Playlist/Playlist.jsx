import React, {useContext, useState} from "react";

import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import {Track} from "./Track";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Tooltip from "@material-ui/core/Tooltip";
import {PlayerContext} from "../../context/playerState";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "60%",
        [theme.breakpoints.down('xs')]: {
            width: "85%",
        },
        margin: "10px auto",
        padding: 10,
        // opacity: '80%',
        boxShadow: "none",
        backgroundColor: `primary`,
    },
    playlistHeader: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: '1px solid #f0f0f0',
    },
    input: {
        display: 'none',
    },
}));

export const Playlist = ({audio, formatTime}) => {
    const deleteItem = (track) => {
        console.log(track)
    };

    const classes = useStyles();
    const {
        tracks, shuffle, setTrack, playing, currentTrack, clickLike, reverse,
        clickUnlike, tracksNumber, togglePlaying, shuffleTracklist, reverseTracklist
    } = useContext(PlayerContext);
    const chooseTrack = (id) => {
        if (id === currentTrack.id) {
            if (audio.current.paused) {
                audio.current.play();
                togglePlaying(true);
            } else {
                audio.current.pause();
                togglePlaying(false);
            }
        } else {
            setTrack(id);
            audio.current.play();
            togglePlaying(true);
        }
    };
    const likeTrack = (track) => {
        // console.log(track);
        clickLike(track)
    };
    const tracksList = tracks.map((track, index) => <Track key={track.id}
                                                           track={track}
                                                           chooseTrack={chooseTrack}
                                                           currentTrack={currentTrack}
                                                           likeTrack={likeTrack}
                                                           deleteItem={deleteItem}
                                                           playing={playing}
                                                           formatTime={formatTime}
                                                           index={index}
    />)

    return (
        <div className={classes.root}>
            <div className={classes.playlistHeader}>
                Playlist
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
                    <Tooltip title="upload" placement="top">
                        <div>
                            <input accept="audio/*" className={classes.input} id="icon-button-file" type="file"/>
                            <label htmlFor="icon-button-file">
                                <IconButton color="secondary" aria-label="upload track" component="span">
                                    <CloudUploadIcon/>
                                </IconButton>
                            </label>
                        </div>
                    </Tooltip>
                </span>
            </div>
            <List>
                {tracksList}
            </List>
        </div>
    )
};