import React, {useContext, useState} from "react";
import {PlayerContext} from "../../context/playerState";
import {makeStyles} from "@material-ui/styles";
import {graphicHeight} from "../Graphics/GraphicStyle";
import {headerHeight} from "../Header/HeaderStyles";
import Card from "@material-ui/core/Card";
import {Link as RouterLink} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    playlistRoot: {
        // height: `${graphicHeight}vh`,
        marginTop: `${headerHeight}vh`,
        margin: "auto",
        padding: 10,
        boxSizing: 'border-box',
        overflowY: "auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",

        width: "60%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            justifyContent: "center",
        },
        [theme.breakpoints.up('sm')]: {
            width: "80%",

        },
    },
    card: {
        margin: theme.spacing(2),
        width: 180,
        height: 240,
        textDecoration: 'none'
    },
    action: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    media: {
        height: 180,
        width: 180,
        // margin: 15,
        marginBottom: 0,
    },
}));

export const Albums = ({getAlbum, formatTime}) => {
    const classes = useStyles();
    const {albums} = useContext(PlayerContext);

    return (
        <div className={classes.playlistRoot}>
            {albums.map((album) => (
                <Card key={album.id}
                      onClick={() => {
                          getAlbum(album)
                          console.log('taken album', album)
                      }}
                      className={classes.card}
                      component={RouterLink}
                      to="/playlist"

                >
                    <CardActionArea className={classes.action}>
                        <CardMedia image={album.albumCover}
                                   className={classes.media}/>
                        <CardContent>
                            <Typography gutterBottom variant="body2">
                                {album.albumName}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>))}
        </div>
    )
}