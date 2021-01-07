import React, {useContext, useEffect, useState} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import IconButton from "@material-ui/core/IconButton";
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import Slider from "@material-ui/core/Slider";
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import {PlayerContext} from "../../context/playerState";
import AppBar from "@material-ui/core/AppBar";

export const footerHeight = 40;
const useStyles = makeStyles((theme) => ({
    controls: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        top: "auto",
        bottom: 0,
        backgroundColor: "#121212",
        paddingTop: theme.spacing(9),
        height: `${footerHeight}vh`,
        boxShadow: 'none',
        boxSizing: 'border-box',
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing(1),
        },
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    volume: {
        width: 120,
        alignItems: 'center',
    },
    volumeBar: {
        padding: 0,
        display: 'flex',
    },
    timelineController: {
        margin: "0 auto",
        width: "60%",
        [theme.breakpoints.down('xs')]: {
            width: "85%",
        },
    },

    timelineInfo: {
        width: 40,
        textAlign: 'center',
    },
    musicTitle: {
        color: "#e91e63",
        align: "center",
    },
    actions: {
        display: 'flex',
        width: 300,
        [theme.breakpoints.down('xs')]: {
            width: "85%",
        },
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

const TimeSlider = withStyles({
    root: {
        height: 3,
    },
    thumb: {
        height: 12,
        width: 12,
        color: "#e91e63",
    },
    track: {
        height: 3,
        borderRadius: 4,
        color: "#e91e63",
    },
    rail: {
        height: 3,
        borderRadius: 4,
        color: 'rgba(0, 0, 0, 0.54)',

    }
})(Slider);

export const Actions = ({audio, formatTime, handlePlay}) => {
    const [volume, setVolume] = useState(Number(localStorage.getItem('volume')))
    const {
        currentTrack, currentAlbum, nextTrack, prevTrack, repeat, shuffle,
        playing, toggleRepeat, handleEnd, shuffleTracklist
    } = useContext(PlayerContext);
    const classes = useStyles();
    const theme = useTheme();
    const [duration, setDuration] = useState(0);

    const [currentVolume, setCurrentVolume] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const handleVolume = (event, newValue) => {
        setVolume(newValue);
        localStorage.setItem('volume', JSON.stringify(newValue))
        audio.current.volume = newValue / 100;
    };
    const soundOff = (event) => {
        setCurrentVolume(audio.current.volume * 100);
        if (audio.current.volume) {
            setVolume(0);
            audio.current.volume = 0;
        } else {
            setVolume(currentVolume);
            audio.current.volume = currentVolume / 100;
        }
    };
    const handleDuration = (event, newValue) => {
        setCurrentTime(newValue);
        audio.current.currentTime = newValue;
    };
    const updateTime = (event) => {
        setCurrentTime(event.target.currentTime);
    };
    const onCanPlay = (event) => {
        setDuration(event.target.duration)
    };
    const onEnded = () => {
        if (repeat) {
            setCurrentTime(0);
            audio.current.play();

        } else {
            handleEnd()
        }
    };
    //должно сработать только один раз вначале, чтоб не включился autoPlay
    useEffect(() => {
        if(Number(localStorage.getItem('volume')) == null || undefined) {
            localStorage.setItem('volume', JSON.stringify(50))
        }
        audio.current.volume = volume / 100;
        console.log(volume)
    }, []);

    return (
        <div>
            <audio onTimeUpdate={updateTime}
                   onCanPlay={onCanPlay}
                   onEnded={onEnded}
                   ref={audio}
                   preload="true"
                   autoPlay={true}
                   src={currentTrack?.sound}
            />
            <AppBar position="fixed" className={classes.controls} color="primary">
                <Typography variant="h5" className={classes.musicTitle}>
                    {currentTrack.trackName}
                </Typography>
                <Typography variant="subtitle1" className={classes.musicTitle}>
                    {currentAlbum.artist}
                </Typography>
                <div className={classes.timelineController}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="body1" color="secondary">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </Typography>
                        </Grid>
                        <Grid item container className={classes.volume}>
                            <Grid item>
                                <IconButton aria-label="volume" color="secondary" onClick={soundOff}>
                                    {volume ? <VolumeUp/> : <VolumeOffIcon/>}
                                </IconButton>
                            </Grid>
                            <Grid item xs>
                                <Slider value={volume}
                                        onChange={handleVolume}
                                        aria-labelledby="continuous-slider"
                                        color="secondary"
                                        className={classes.volumeBar}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <TimeSlider value={duration ? currentTime : 0}
                                onChange={handleDuration}
                                max={duration}
                    />
                </div>
                <div className={classes.actions}>
                    <IconButton aria-label="repeat" onClick={toggleRepeat}>
                        {repeat ? <RepeatIcon color='secondary'/> : <RepeatIcon/>}
                    </IconButton>
                    <IconButton aria-label="previous" onClick={prevTrack}>
                        {theme.direction === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
                    </IconButton>
                    <IconButton aria-label="play/pause" onClick={handlePlay} style={{border: '1px solid #f5f5f5'}}>
                        {playing ? <PauseIcon className={classes.playIcon}/>
                            : <PlayArrowIcon className={classes.playIcon}/>}
                    </IconButton>
                    <IconButton aria-label="next" onClick={nextTrack}>
                        {theme.direction === 'rtl' ? <SkipPreviousIcon/> : <SkipNextIcon/>}
                    </IconButton>
                    <IconButton aria-label="shuffle" onClick={shuffleTracklist}>
                        {shuffle ? <ShuffleIcon color='secondary'/> : <ShuffleIcon/>}
                    </IconButton>
                </div>
            </AppBar>
        </div>
    )
};