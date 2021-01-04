import React from "react";
import {Graphics} from "../Graphics/Graphics";
import {Actions} from "../Actions/Actions";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    trackPage: {}
}))

export const TrackPage = ({audio, formatTime, handlePlay}) => {
    const classes = useStyles()
    return (
        <div className={classes.trackPage}>
            <Graphics/>
            <Actions audio={audio} formatTime={formatTime} handlePlay={handlePlay}/>
        </div>
    )
}