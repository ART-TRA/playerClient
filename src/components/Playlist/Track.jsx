import React, {useEffect, useRef, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import MusicVideoIcon from "@material-ui/icons/MusicVideo";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ListItem from "@material-ui/core/ListItem";
import {makeStyles} from "@material-ui/styles";
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from "@material-ui/core/Tooltip";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const useStyles = makeStyles(() => ({
    root: {},
    track: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 0,

    },
    currentTrack: {
        color: "#e91e63",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 0,
    },
    trackInfo: {
        margin: "0 10px 0 0",
    },
}));

export const Track = ({track, chooseTrack, currentTrack, likeTrack, deleteItem, playing, formatTime, index}) => {
    const [visible, setVisible] = useState(false);
    const classes = useStyles();
    const audio = useRef(track.sound);
    const setTrack = (id) => {
        chooseTrack(id)
        console.log("audio:", audio)
    }
    return (
        <ListItem
            className={currentTrack.id === track.id ? classes.currentTrack : classes.track}
            button
            // key={track.id}
            onClick={() => setTrack(track.id)}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <audio ref={audio} src={track.sound}/>
            <div>
                {track.id === currentTrack.id
                    ? (playing ? <IconButton disabled><PauseIcon/></IconButton> :
                        <IconButton disabled><PlayArrowIcon/></IconButton>)
                    : <IconButton disabled><MusicVideoIcon/></IconButton>}
                {track.artist} - {track.name}
            </div>
            <div className={classes.track}>
                {visible && <div className={classes.trackInfo}>
                    <Tooltip title="like" placement="top">
                        <IconButton aria-label="like" onClick={() => likeTrack(track.id)}>
                            {track.like ? <FavoriteIcon fontSize="small"/> : <FavoriteBorderIcon fontSize="small"/>}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="delete" placement="top">
                        <IconButton aria-label="delete" onClick={() => deleteItem(track.id)}>
                            <DeleteForeverIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="download" placement="top">
                        <IconButton aria-label="download">
                            <GetAppIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </div>}
                {formatTime(audio.current.duration)}
            </div>
        </ListItem>
    )
};

// onClick={() => downloadItem(track.id)}