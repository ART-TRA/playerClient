import {makeStyles} from "@material-ui/core/styles";
import logo from "./assets/img/animated_icon.gif"

export const useStyles = makeStyles((theme) => ({
    appRoot: {
        flexGrow: 1,
        backgroundColor: `primary`,
    },
    prWrap: {
        height: "100vh",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b2b2b',
        margin: 0,
        padding: 0,
    },
    preloader: {
        width: 400,
        height: 300,
        background: `url(${logo}) no-repeat`,
        backgroundSize: 'contain',
    },
}));
//color={props.themeMode === 'light' ? '#ffffff' : '#212121'}