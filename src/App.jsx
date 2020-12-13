import React, {useContext, useEffect, useRef, useState} from 'react';
import './App.css';
import {Graphics} from "./components/Graphics/Graphics";
import {Playlist} from "./components/Playlist/Playlist";
import {Actions} from "./components/Actions/Actions";
import {Header} from "./components/Header/Header";
import {PlayerContext} from "./context/playerState";
import SwipeableViews from 'react-swipeable-views';
import Typography from "@material-ui/core/Typography";
import {useTheme} from '@material-ui/core/styles';
import {useQuery} from "@apollo/client";
import {FETCH_PLAYLIST_QUERY} from "./components/Queries/queries";
import {useStyles} from "./AppStyles";




const TabPanel = ({children, dir}) => (
    <Typography component="div" dir={dir}>
        {children}
    </Typography>
);

const Player = (props) => {
    const {currentTrack, nextTrack, prevTrack, playing, togglePlaying, setPlaylist, getFirstTrack, tracks} = useContext(PlayerContext);
    const {loading, error, data} = useQuery(FETCH_PLAYLIST_QUERY);
    const audio = useRef([]);
    useEffect(() => {
        if (data) {
            // console.log("data", data)
            setPlaylist(data.getPlaylist)
            getFirstTrack(data.getPlaylist[0])
            audio.current.pause();
            //console.log("currentTrack", currentTrack)
        }
    }, [data])
    const classes = useStyles();
    const [state, setState] = useState({value: 0});
    const theme = useTheme();

    const formatTime = (sec) => {
        let min = (sec - (sec %= 60)) / 60;
        if (min < 10) {
            min = `0${min}`
        }
        return min + (10 < sec ? ':' : ':0') + ~~(sec)
        // return (sec - (sec %= 60)) / 60 + (10 < sec ? ':' : ':0') + ~~(sec)
    };
    const handleChange = (event, value) => {
        setState({value});
    };
    const handleChangeIndex = index => {
        setState({value: index});
    };
    const handlePlay = (event) => {
        if (audio.current.paused) {
            audio.current.play();
            togglePlaying(true);
        } else {
            audio.current.pause();
            togglePlaying(false);
        }
    };
    return (
        <div className={classes.root}>
            {loading ? <p>Loading ...</p> :
                <div className={classes.root}>
                    <Header
                        value={state.value}
                        handleChange={handleChange}
                        handlePlay={handlePlay}
                        themeMode={props.themeMode}
                        darkMode={props.darkMode}
                        lightMode={props.lightMode}
                    />
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={state.value}
                        onChangeIndex={handleChangeIndex}>

                        <TabPanel dir={theme.direction}>
                            <Graphics/>
                            <Actions audio={audio} formatTime={formatTime} handlePlay={handlePlay}/>
                        </TabPanel>
                        <TabPanel dir={theme.direction}>
                            <Playlist audio={audio} formatTime={formatTime}/>
                        </TabPanel>
                    </SwipeableViews>
                </div>
            }
        </div>
    )
};

export default Player;
