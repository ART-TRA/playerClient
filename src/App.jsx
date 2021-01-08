import React, {useContext, useEffect, useRef, useState} from 'react';
import './App.css';
import {Playlists} from "./components/Playlist/Playlist";
import {Header} from "./components/Header/Header";
import {PlayerContext} from "./context/playerState";
import SwipeableViews from 'react-swipeable-views';
import Typography from "@material-ui/core/Typography";
import {useTheme} from '@material-ui/core/styles';
import {useQuery} from "@apollo/client";
import {FETCH_ALBUMS_QUERY} from "./components/Queries/queries";
import {useStyles} from "./AppStyles";
import {TrackPage} from "./components/TrackPage/TrackPage";
import {Albums} from "./components/Albums/Albums";
import {Route, Switch} from "react-router-dom";
import {graphicHeight} from "./components/Graphics/GraphicStyle";


const TabPanel = ({children, dir}) => (
    <Typography component="div" dir={dir}>
        {children}
    </Typography>
);

const Player = (props) => {
    const {togglePlaying, setStorageTrack, setAlbums, setCurrentAlbum, setStorageAlbum} = useContext(PlayerContext);
    const {loading, error, data} = useQuery(FETCH_ALBUMS_QUERY);
    const audio = useRef([]);

    useEffect(() => {
        if (data) {
            setAlbums(data.getAlbums)
            const playTrackId = localStorage.getItem('playingTrack')
            const playAlbumId = localStorage.getItem('playingAlbum')
            if (playTrackId) {
                setStorageAlbum(playAlbumId)
                setStorageTrack(playTrackId)
            } else {
                //если первый запуск на устр-ве и localStorage пуст
                console.log('localStorage пуст')
                localStorage.setItem('playingAlbum', JSON.stringify("5fcdae98e0cf9db0b0ff17b4"))
                localStorage.setItem('playingTrack', JSON.stringify("5fe2eee8c24a351a54cccb1d"))
                const playTrackId = localStorage.getItem('playingTrack')
                const playAlbumId = localStorage.getItem('playingAlbum')
                if (playTrackId) {
                    setStorageAlbum(playAlbumId)
                    setStorageTrack(playTrackId)
                }
            }
        }
    }, [data])

    useEffect(() => {
        //у audio стоит autoplay=true, после обновления страницы аудио воспроизводится автоматически
        //для смены иконок воспроизв-я
        togglePlaying(true);
    }, [])

    const classes = useStyles();
    const [state, setState] = useState({value: 0});
    const theme = useTheme();

    const formatTime = (sec) => {
        let hours = 0
        let min = (sec - (sec %= 60)) / 60;
        if (min < 10) {
            min = `0${min}`
        }
        if (min > 59) {
            hours = (min - (min %= 60)) / 60;
            if (hours < 10) {
                hours = `0${hours}`
            }
            if (min < 10) {
                min = `0${min}`
            }
            return hours + ':' + min + (10 <= sec ? ':' : ':0') + ~~(sec)
        } else {
            return min + (10 <= sec ? ':' : ':0') + ~~(sec)
        }
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
    const [album, setAlbum] = useState(null)
    const getAlbum = (album) => {
        if (album) {
            setAlbum(album)
        }
    }

    return (
        <div className={classes.appRoot}>
            {loading ?
                <div className={classes.prWrap}>
                    <div className={classes.preloader}/>
                </div>
                :
                <div>
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
                            <TrackPage audio={audio} formatTime={formatTime} handlePlay={handlePlay}/>
                        </TabPanel>
                        <TabPanel dir={theme.direction}>
                            <div style={{height: `${graphicHeight}vh`,}}>
                                <Switch>
                                    <Route exact path='/albums' render={() => <Albums audio={audio}
                                                                                      formatTime={formatTime}
                                                                                      getAlbum={getAlbum}/>}/>
                                    <Route path='/playlist' render={() => <Playlists audio={audio}
                                                                                     formatTime={formatTime}
                                                                                     album={album}/>}/>
                                </Switch>
                            </div>

                        </TabPanel>
                    </SwipeableViews>
                </div>
            }
        </div>
    )
};

export default Player;
