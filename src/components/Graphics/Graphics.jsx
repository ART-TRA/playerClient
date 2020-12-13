import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {PlayerContext} from "../../context/playerState";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    img: {
        width: 400,
        height: 400,
        [theme.breakpoints.down('xs')]: {
            width: 350,
            height: 350,
        },
        margin: "40px auto",
        backgroundSize: 'cover',
        border: '2px solid grey',
    },
}));

export const Graphics = () => {
    const {currentTrack} = useContext(PlayerContext);
    const classes = useStyles();
    return (
        // <div className={classes.root} style={{backgroundImage: `url(${currentTrack.cover})`}}/>
        <div className={classes.root}>
            <img className={classes.img} src={currentTrack.cover}/>
        </div>


    )
};