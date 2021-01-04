import React, {useContext} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import {PlayerContext} from "../../context/playerState";
import {useStyles} from "./HeaderStyles";
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import {useTheme} from '@material-ui/core/styles';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import HeadsetIcon from '@material-ui/icons/Headset';
import {useMediaQuery} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import Card from "@material-ui/core/Card";


export const Header = ({handleChange, value, handlePlay, themeMode, darkMode, lightMode}) => {
    const {currentTrack, nextTrack, prevTrack, playing, currentAlbum} = useContext(PlayerContext);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"))

    const classes = useStyles();
    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="secondary">
                <Toolbar className={classes.toolBar} style={{padding: 0, minHeight: 'auto'}}>
                    <div className={classes.tabs}>
                        {matches
                            ? <Tabs value={value} onChange={handleChange} variant="fullWidth" className={classes.tab} style={{overflow: 'unset', marginRight: 10}}>
                                <Tab icon={<HeadsetIcon/>} style={{padding: 0, minWidth: 54}}/>
                                <Tab icon={<PlaylistPlayIcon fontSize="large"/>} component={RouterLink} to="/albums" style={{padding: 0, minWidth: 54}}/>
                            </Tabs>
                            : <Tabs value={value} onChange={handleChange} variant="fullWidth" className={classes.tab} style={{overflow: 'unset',}}>
                                <Tab label="Home"/>
                                <Tab label="Playlists" component={RouterLink} to="/albums"/>
                            </Tabs>
                        }
                        <div className={classes.controls}>
                            {!matches && <div className={classes.controls} style={{marginRight: 20}}>
                                <IconButton aria-label="previous" onClick={prevTrack}>
                                    {theme.direction === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
                                </IconButton>
                                <IconButton aria-label="play/pause" onClick={handlePlay}>
                                    {playing ? <PauseIcon className={classes.playIcon}/>
                                        : <PlayArrowIcon className={classes.playIcon}/>}
                                </IconButton>
                                <IconButton aria-label="next" onClick={nextTrack}>
                                    {theme.direction === 'rtl' ? <SkipPreviousIcon/> : <SkipNextIcon/>}
                                </IconButton>
                            </div>}

                            <div className={classes.track}>
                                {currentAlbum.artist + " - " + currentTrack.trackName}
                            </div>
                        </div>
                    </div>
                    {/*<Button color="inherit">Login</Button>*/}
                    {/*{themeMode === 'dark'*/}
                    {/*    ? <Brightness7Icon onClick={lightMode}/>*/}
                    {/*    : <Brightness4Icon onClick={darkMode}/>}*/}
                </Toolbar>
            </AppBar>
        </div>
    )
};