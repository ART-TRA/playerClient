import React, {useContext, useEffect, useRef, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import MusicVideoIcon from "@material-ui/icons/MusicVideo";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ListItem from "@material-ui/core/ListItem";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from "@material-ui/core/Tooltip";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {PlayerContext} from "../../context/playerState";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    row: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',

        marginRight: 5,
    },
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
        // position: "absolute",
        display: "flex",
        // right: 40,
        // margin: "0 10px 0 0",
    },
}));

export const Track = ({chooseTrack, currentTrack, likeTrack, playing, formatTime, album, track}) => {

    const {currentAlbum} = useContext(PlayerContext);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const [visible, setVisible] = useState(false);
    // const [showMore, setShow] = useState(true);
    const classes = useStyles();
    // const showTrackActions = () => {
    //     setVisible(true)
    //     // setShow(false)
    // }
    return (
        <div className={classes.root}>
            <ListItem
                className={currentTrack.id === track.id ? classes.currentTrack : classes.track}
                button
                key={track.id}
                onClick={(e) => {
                    chooseTrack(album.id, track.id)

                    // localStorage.setItem('playingAlbum', JSON.stringify(album.id))
                    // localStorage.setItem('playingTrack', JSON.stringify(track.id))

                    // console.log(e.target, 'row click')
                    // console.log("track:", currentTrack)
                    // console.log("track:", currentAlbum)
                }}

                // onMouseEnter={!matches ? () => {
                //     setVisible(true)
                //     // setShow(true)
                // } : null}
                // onMouseLeave={() => {
                //     setVisible(false)
                //     // setShow(true)
                // }}
                onMouseEnter={() => {
                    setVisible(true)
                }}
                onMouseLeave={() => {
                    setVisible(false)
                }}
            >
                {/*<audio ref={audio} src={track.sound}/>*/}
                <div className={classes.row}>
                    {track.id === currentTrack.id
                        ? (playing ? <IconButton disabled><PauseIcon/></IconButton> :
                            <IconButton disabled><PlayArrowIcon/></IconButton>)
                        : <IconButton disabled><MusicVideoIcon/></IconButton>}
                        {album.artist} - {track.trackName}
                </div>
                <div className={classes.track}>
                    {visible && <div className={classes.trackInfo}>
                        <Tooltip title="like" placement="top">
                            <IconButton aria-label="like" onClick={(e) => {
                                e.stopPropagation();
                                likeTrack(track.id)
                            }}>
                                {track.like ? <FavoriteIcon fontSize="small"/> : <FavoriteBorderIcon fontSize="small"/>}
                            </IconButton>
                        </Tooltip>
                        {/*<Tooltip title="delete" placement="top">*/}
                        {/*    <IconButton aria-label="delete" onClick={(e) => {*/}
                        {/*        e.stopPropagation();*/}
                        {/*        deleteItem(track.id)*/}
                        {/*    }}>*/}
                        {/*        <DeleteForeverIcon fontSize="small"/>*/}
                        {/*    </IconButton>*/}
                        {/*</Tooltip>*/}
                        {/*<Tooltip title="download" placement="top">*/}
                        {/*    <IconButton aria-label="download" onClick={(e) => {*/}
                        {/*        e.stopPropagation();*/}
                        {/*    }}>*/}
                        {/*        <GetAppIcon fontSize="small"/>*/}
                        {/*    </IconButton>*/}
                        {/*</Tooltip>*/}
                    </div>}
                    {/*{matches && <IconButton aria-label="more" onClick={(e) => {*/}
                    {/*    e.stopPropagation();*/}
                    {/*    showTrackActions()*/}
                    {/*}}>*/}
                    {/*    <MoreVertIcon fontSize="small"/>*/}
                    {/*</IconButton>}*/}
                    {formatTime(track.duration)}
                </div>
            </ListItem>
        </div>
    )
};

// onClick={() => downloadItem(track.id)}