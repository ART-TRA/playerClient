import React, {useContext} from "react";
import {PlayerContext} from "../../context/playerState";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useStyles} from "./GraphicStyle";

export const Graphics = () => {
    // const matches = useMediaQuery('(max-height:700px)');
    const matches = useMediaQuery('(max-height:900px)');
    const {currentAlbum} = useContext(PlayerContext);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img className={classes.img}
                 src={currentAlbum.albumCover}
                 style={
                     matches ? {width: 300, height: 300, marginBottom: "10px"} : null
                 }
                 alt="cover"
            />
        </div>
    )
};