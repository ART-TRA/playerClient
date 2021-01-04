import React, {useContext} from "react";
import {PlayerContext} from "../../context/playerState";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useStyles} from "./GraphicStyle";

export const Graphics = () => {
    const matches = useMediaQuery('(max-height:700px)');
    const {currentAlbum} = useContext(PlayerContext);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img className={classes.img}
                 src={currentAlbum.albumCover}
                 style={matches ? {margin: "0 auto"} : null}
                 alt="cover"
            />
        </div>
    )
};