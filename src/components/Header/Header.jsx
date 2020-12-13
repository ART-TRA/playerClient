import React, {useContext} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import {PlayerContext} from "../../context/playerState";
import {useStyles} from "./HeaderStyles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import {useTheme} from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import HomeIcon from '@material-ui/icons/Home';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import HeadsetIcon from '@material-ui/icons/Headset';
import {useMediaQuery} from "@material-ui/core";
import Ticker from "react-ticker";
import LinesEllipsis from 'react-lines-ellipsis'


export const Header = ({handleChange, value, handlePlay, themeMode, darkMode, lightMode}) => {
    const {currentTrack, nextTrack, prevTrack, playing} = useContext(PlayerContext);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"))

    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.appBar} color="secondary">
            <Toolbar className={classes.toolBar}>
                <div className={classes.tabs}>
                    {/*<span className={classes.logo}>*/}
                    {/*    <HeadsetIcon fontSize="large"/>*/}
                    {/*</span>*/}
                    {matches
                        ? <Tabs value={value} onChange={handleChange} variant="fullWidth">
                            <Tab icon={<HeadsetIcon className={classes.icon}/>} className={classes.tab} disableRipple={true}/>
                            <Tab icon={<PlaylistPlayIcon className={classes.icon} fontSize="large"/>} className={classes.tab} disableRipple={true}/>
                        </Tabs>
                        : <Tabs value={value} onChange={handleChange} variant="fullWidth">
                            <Tab label="Home" className={classes.tab} disableRipple={true}/>
                            <Tab label="Playlist" className={classes.tab} disableRipple={true}/>
                        </Tabs>
                    }
                    <div className={classes.controls}>
                        {!matches && <div className={classes.controls}>
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
                            {currentTrack.artist + " - " + currentTrack.name}
                            {/*<LinesEllipsis*/}
                            {/*    text={currentTrack.artist + " - " + currentTrack.name}*/}
                            {/*    maxLine='1'*/}
                            {/*    ellipsis='...'*/}
                            {/*    trimRight*/}
                            {/*    basedOn='letters'*/}
                            {/*/>*/}

                        </div>
                        {/*<div className={classes.ticker}>*/}
                        {/*    <Ticker mode="await" offset="run-in">*/}
                        {/*        {({index}) => <>{currentTrack.artist} - {currentTrack.name}</>}*/}
                        {/*    </Ticker>*/}
                        {/*</div>*/}
                    </div>
                </div>
                {/*<Button color="inherit">Login</Button>*/}
                {/*{themeMode === 'dark'*/}
                {/*    ? <Brightness7Icon onClick={lightMode}/>*/}
                {/*    : <Brightness4Icon onClick={darkMode}/>}*/}
            </Toolbar>
        </AppBar>
    )
};